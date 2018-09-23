// Imports the Google Cloud client library
import { Storage } from "@google-cloud/storage";

// Your Google Cloud Platform project ID
const projectId = "sheets-api-1535602364382";

// Creates a client
const storage = new Storage({ projectId });

// The name for the new bucket
const bucketName = "pdf-parser";
const fileName = "test.pdf";

const myBucket = storage.bucket(bucketName);

export const readFileStream = (path: string) => new Promise((resolve, reject) => {
    let buffer = Buffer.alloc(0);

    // Creates the new bucket
    const file = myBucket.file(fileName);

    file.createReadStream()
        .on("error", (err: any) => reject(err))
        .on("data", (chunk: Buffer) => buffer = Buffer.concat([buffer, chunk]))
        .on("end", () => resolve(buffer));
});
