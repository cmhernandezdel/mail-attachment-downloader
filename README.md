# mail-attachment-downloader
Project to download mail attachments from Gmail automatically.

## Getting started
You can [read the quickstart guide](https://developers.google.com/workspace/gmail/api/quickstart/js) or follow the steps below.

Create a new [Google Cloud](https://console.cloud.google.com) project and enable the Gmail API. After that, configure [auth branding](https://console.cloud.google.com/auth/branding). Then [create a desktop client](https://console.cloud.google.com/auth/clients) and download the JSON. Save this JSON with the name `credentials.json` in the `src/` folder.

Run the application with `npm start` and you're good to go 🚀.

## Endpoints
```
GET /gmail
Query params: sender

Example: GET /gmail?sender=jane.doe@mail.com
```