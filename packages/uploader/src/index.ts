import Cors from "cors";
import { NextFunction, Request, Response } from "express";

import { Storage } from "@google-cloud/storage";

import Multer from "multer";

const cors = Cors({ origin: true });

const CLOUD_BUCKET = "pdf-parser";
const projectId = "sheets-api-1535602364382";

const gcconfig = {
  projectId,
//   keyFilename: "my-fb-key.json"
};

const gcs = new Storage(gcconfig);

// The name for the new bucket
const bucket = gcs.bucket(CLOUD_BUCKET);

const multer = Multer({
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb
    },
    storage: Multer.memoryStorage(),
});

function getPublicUrl(filename: string) {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

function uploader(req: any, res: Response, next: NextFunction) {
    if (!req.file) {
        // tslint:disable-next-line:no-console
        console.log("file doesn't exist");
        return next();
    }

    const gcsname = Date.now() + req.file.originalname;
    const file = bucket.file(gcsname);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
        resumable: false,
    });

    stream.on("error", (err: any) => {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on("finish", () => {
        req.file.cloudStorageObject = gcsname;
        file.makePublic(() => {
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
            next();
        });
    });

    stream.end(req.file.buffer);
}

export const uploadFile = (req: any, res: Response, next: NextFunction) => {
    const sendFileName = () => {
        const fileName = req.file && req.file.cloudStoragePublicUrl ? req.file.cloudStoragePublicUrl : "error";
        res.send({fileName});
    };
    const upload = () => uploader(req, res, sendFileName);
    multer.single("fileName")(req, res, upload);
};
