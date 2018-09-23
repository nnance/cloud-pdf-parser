import { createReadStream } from "fs";

export const readFileStream = (path: string) => new Promise((resolve, reject) => {
    let buffer = Buffer.alloc(0);
    createReadStream(path)
        .on("error", (err: any) => reject(err))
        .on("data", (chunk: Buffer) => buffer = Buffer.concat([buffer, chunk]))
        .on("end", () => resolve(buffer));
});
