import pdf from "pdf-parse";

import { readFileStream } from "./cloud-storage";

// tslint:disable:no-console
readFileStream("./fixtures/test.pdf")
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
