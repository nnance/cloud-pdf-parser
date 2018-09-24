# cloud-pdf-parser

PDF Parser via Google Functions

## Getting Started

Install dependencies & build

```ssh
$ npm i && npm run build
```

Starting the dev server

```ssh
$ npm run watch
```

## Testing

Test local server

```ssh
$ curl -X POST -H "Content-Type: application/json" -d "{ \"fileName\": \"test.pdf\" }" http://localhost:4000/parseLocalPDF
```

If you are using the `rest` extension for VS Code you can send requests using `./fixtures/requests.http`

## Deployment

Take the following steps to set your project specific details, build and deploy

* Update the const bucketName and projectId in the `./src/index.ts` file
* Rebuild project `$ npm run build`
* Deploy to Google `$ gcloud functions deploy parsePDF --runtime nodejs8 --trigger-http`

Test Cloud Function

```ssh
$ curl -X POST -H "Content-Type: application/json" -d "{ \"fileName\": \"test.pdf\" }" https://GCP_REGION-PROJECT_ID.cloudfunctions.net/parsePDF
```
