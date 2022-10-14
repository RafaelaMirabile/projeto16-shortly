import express from 'express'
import { getUserUrls } from '../controllers/userContoller.js';
import { validateToken } from '../middlewares/tokenValidation.js';

const router = express.Router();

router.get('/users/:me',validateToken ,getUserUrls);

export default router;