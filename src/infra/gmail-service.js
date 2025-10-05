import path from 'node:path';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import * as fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

let auth;

const getMessagesFromSender = async (sender) => {
  const gmail = await gmailAuthenticate();

  const messagesRes = await gmail.users.messages.list({
    userId: 'me',
    includeSpamTrash: false,
    maxResults: 500,
    q: `from:${sender}`
  });

  const messages = messagesRes.data.messages;
  if (!messages || messages.length === 0) {
    return [];
  }

  return messages;
};

const downloadAttachments = async (messages) => {
    const gmail = await gmailAuthenticate();
    const retValue = [];

    for (const message of messages) {
        const response = await gmail.users.messages.get({
            userId: 'me',
            id: message.id,
            format: 'full'
        });

        const attachmentInfo = response.data.payload.parts.find(p => p.body.attachmentId !== undefined);
        if (!attachmentInfo) {
            continue;
        }

        const attachment = await gmail.users.messages.attachments.get({
            userId: 'me',
            messageId: message.id,
            id: attachmentInfo.body.attachmentId,
        });

        const { data } = attachment.data;
        const filename = `${uuidv4()}.pdf`;
        await fs.writeFile(`${process.env.DOWNLOADS_PATH}/${filename}`, Buffer.from(data, 'base64'));
        retValue.push(filename);
    }

    return retValue;
};

const gmailAuthenticate = async () => {
    if (!auth) {
        auth = await authenticate({
            scopes: SCOPES,
            keyfilePath: CREDENTIALS_PATH,
        });
    }

    return google.gmail({version: 'v1', auth});
};

export { getMessagesFromSender, downloadAttachments }