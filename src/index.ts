import pdf from "pdf-parse";

import { Request, Response } from "express";

import { readFileStream } from "./cloud-storage";
import { readFileStream as readLocalFileStream } from "./local-storage";
import { getValues } from "./transform";

const bucketName = "pdf-parser";
const projectId = "sheets-api-1535602364382";

const addValues = (pdfObj: any) => Promise.resolve(
    Object.assign(pdfObj, {
        values: getValues(pdfObj.text),
    }),
);

const parseStream = (fileStream: () => Promise<{}>, req: Request, res: Response) => {
    fileStream()
        .then(pdf)
        .then(addValues)
        .then((results) => res.send(results))
        .catch((err) => res.status(500).send(err));
};

export const parsePDF = (req: Request, res: Response) => {
    const fileName = req.body.fileName;

    if (!fileName) {
        res.status(500).send({ error: "must provide a fileName" });
    } else {
        const fileStream = readFileStream({ bucketName, fileName, projectId });
        parseStream(fileStream, req, res);
    }

};

export const parseLocalPDF = (req: Request, res: Response) => {
    const fileStream = readLocalFileStream("./fixtures/test.pdf");
    parseStream(fileStream, req, res);
};
