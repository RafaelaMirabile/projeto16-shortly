import express from 'express'
import { createUser, login } from '../controllers/authController.js';
import { validateCreateUser, validateUser } from '../middlewares/userValidation.js';
const router = express.Router();

router.post('/signup',validateCreateUser,createUser);
router.post('/signin',validateUser,login);

export default router;