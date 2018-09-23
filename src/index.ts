import { readFileSync } from "fs";
import pdf from "pdf-parse";

// tslint:disable:no-console
const dataBuffer = readFileSync("./fixtures/test.pdf");

pdf(dataBuffer).then((data: any) => {
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
