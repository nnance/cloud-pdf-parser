import fs from "fs";
import os from "os";
import path from "path";

import Busboy from "busboy";
import Cors from "cors";
import { Request, Response } from "express";

import { Storage } from "@google-cloud/storage";

const cors = Cors({ origin: true });

const bucketName = "pdf-parser";
const projectId = "sheets-api-1535602364382";

const gcconfig = {
  projectId,
//   keyFilename: "my-fb-key.json"
};

const gcs = new Storage(gcconfig);

export const uploadFile = (req: Request, res: Response) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
        return res.status(500).json({
            message: "Not allowed",
        });
    }
    const busboy = new Busboy({ headers: req.headers });
    let uploadData: any = {};

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
        const filepath = path.join(os.tmpdir(), filename);
        uploadData = { file: filepath, type: mimetype };
        file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on("finish", () => {
        gcs.bucket(bucketName)
            .upload(uploadData.file, {
                metadata: {
                    metadata: {
                        contentType: uploadData.type,
                    },
                },
                uploadType: "media",
            }, (err: any) => {
                if (err) {
                    res.status(500).json({
                        error: err,
                    });
                } else {
                    res.status(200).json({
                        message: "It worked!",
                    });
                }
            });
    });
    busboy.end(req.body);
  });
};
