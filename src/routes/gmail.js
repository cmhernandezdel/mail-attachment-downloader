import { Router } from "express";
import { downloadAttachments, getMessagesFromSender } from "../infra/gmail-service.js";

const router = Router();

router.get('/', async (req, res) => {
    const sender = req.query.sender;
    const messages = await getMessagesFromSender(sender);
    const attachments = await downloadAttachments(messages);
    res.send(attachments);
});

export default router;