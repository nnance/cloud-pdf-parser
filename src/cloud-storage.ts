// Imports the Google Cloud client library
import { Storage } from "@google-cloud/storage";

export interface IFileOptions {
    projectId: string;
    bucketName: string;
    fileName: string;
}

export const readFileStream = (options: IFileOptions) => () => new Promise((resolve, reject) => {
    // Creates a client
    const storage = new Storage({ projectId: options.projectId });

    // The name for the new bucket
    const myBucket = storage.bucket(options.bucketName);

    // Creates the new bucket
    const file = myBucket.file(options.fileName);

    let buffer = Buffer.alloc(0);
    file.createReadStream()
        .on("error", (err: any) => reject(err))
        .on("data", (chunk: Buffer) => buffer = Buffer.concat([buffer, chunk]))
        .on("end", () => resolve(buffer));
});
