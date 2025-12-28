import express from 'express';
const router = express.Router();
import userRouter from './users.js';
// import { StatusCodes } from 'http-status-codes';
router.use('/users', userRouter);

export default router;
