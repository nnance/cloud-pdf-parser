import { readFile } from "fs";
import pdf from "pdf-parse";

const readFilePromise = (path: string) => new Promise((resolve, reject) => {
    readFile(path, (err, data) => err ? reject(err) : resolve(data));
});

// tslint:disable:no-console
readFilePromise("./fixtures/test.pdf")
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
    });
