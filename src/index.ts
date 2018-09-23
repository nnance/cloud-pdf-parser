import pdf from "pdf-parse";

import { Request, Response } from "express";

import { readFileStream } from "./cloud-storage";
const fileStream = readFileStream({
    bucketName: "pdf-parser",
    fileName: "test.pdf",
    projectId: "sheets-api-1535602364382",
});

export const parsePDF = (req: Request, res: Response) => {
    fileStream()
        .then(pdf)
        .then((data: any) => res.send(data.text))
        .catch((err) => res.status(500).send(err));
};

/*
import { readFileStream } from "./local-storage";
const fileStream = readFileStream("./fixtures/test.pdf");
*/

/*
// tslint:disable:no-console
fileStream()
    .then(pdf)
    .then((data: any) => {
        // number of pages
        console.log(data.numpages);
        // number of rendered pages
        console.log(data.numrender);
        // PDF info
        console.log(data.info);
        // PDF metadata
        console.log(data.metadata);
        // PDF.js version
        // check https://mozilla.github.io/pdf.js/getting_started/
        console.log(data.version);
        // PDF text
        console.log(data.text);
    })
    .catch((err) => console.error(err));
*/
