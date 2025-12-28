import express from 'express';
import { StatusCodes } from 'http-status-codes';

import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).send('Pong');
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
  connectDB();
});
// slackmessagingapp //UvRxT6hzwGxjWD3N
//mongodb+srv://slackmessagingapp:UvRxT6hzwGxjWD3N@cluster0.nyhha57.mongodb.net/
