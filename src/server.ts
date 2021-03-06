import express, {Request, Response} from "express";

import bodyParser from "body-parser";

import { parseLocalPDF, parsePDF } from "./index";

const port = 4000;
const app = express();

app.use(bodyParser.json());

app.post("/parsePDF", parsePDF);
app.post("/parseLocalPDF", parseLocalPDF);

// Serve the application at the given port
app.listen({ port }, () =>
  // tslint:disable-next-line:no-console
  console.log(`🚀 Server ready at http://localhost:${port}`),
);
