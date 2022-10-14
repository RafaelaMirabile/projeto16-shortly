import express from 'express'
import { createUrl, deleteUrl, getUrlById, redirectToUrl } from '../controllers/urlController.js';
import { validateToken } from '../middlewares/tokenValidation.js';
import { validateUrl } from '../middlewares/urlValidation.js';

const router = express.Router();

router.post('/urls/shorten', validateToken,validateUrl,createUrl);

router.get('/urls/:id',getUrlById);
router.get('/urls/open/:shortUrl',redirectToUrl);

router.delete('/urls/:id',validateToken,deleteUrl);

export default router;