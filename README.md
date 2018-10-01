# cloud-pdf-parser

PDF Parser via Google Functions.  It will parse a file stored in Google Cloud Storage and return a JSON object that is returned by the parse library [pdf-parse](https://www.npmjs.com/package/pdf-parse).  It is also designed to transform the text which is a table and include a values proprty that includes the table data.

### Cloud function library

This project has been refactored to be a mono repo for all cloud functions to simplify project wide refactoring and to make managing common code easier.  This is based on [lerna](https://lernajs.io) for managing multiple npm packages in a single repo.

#### Principals

This project is organized based on a set of principals.   Please follow these principals when contributing to the project:

* Do not share external dependencies between functions.  Each function should be able to be built and deployed independently and shouldn't require a deployment because one function needs to update the version of an external library.
* The common module remain backwards compatible when ever possible.  Again we don't want to force a deploy of all functions because of a breaking change in the common module.
* All modules should strictly adhere to symantic versioning.  Again this helps to avoid / identify the need for a global deployment of all functions which should be avoid at all costs.

#### Project structure

The project structure is based on ideas found in the following articles:

* [Organizing your cloud functions](https://codeburst.io/organizing-your-firebase-cloud-functions-67dc17b3b0da)
* [Building a REST API with Google Cloud Functions](https://medium.com/@andyhume/building-a-rest-api-with-google-cloud-functions-e0acdf1b2620)
* [Setting up local dev for cloud functions](https://rominirani.com/google-cloud-functions-tutorial-setting-up-a-local-development-environment-8acd394a8b76)

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

## To Do

Open project to do list

- [ ] Create a private npm registry to allow the functions to be deployed to Google.  References

* [Private NPM Packages with Google Cloud Functions](https://hackernoon.com/private-npm-packages-with-google-cloud-functions-4cdfb13c37cc)
* [Working with private packages](https://docs.npmjs.com/private-modules/intro)

- [ ] Namespace the package names so that they can be deployed to a private npm registery
