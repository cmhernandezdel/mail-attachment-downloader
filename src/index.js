import express from 'express';
import gmail from './routes/gmail.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 2115;

app.use('/gmail', gmail);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});