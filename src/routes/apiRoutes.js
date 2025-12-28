import express from 'express';
// import { StatusCodes } from 'http-status-codes';
const router = express.Router();
import v1Router from './v1/v1Router.js';
router.use('/v1', v1Router);
export default router;
