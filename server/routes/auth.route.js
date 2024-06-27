import express from 'express';
import { signup, signin, signout, googleOAuth } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', authenticate, signout);
router.post('/google-oauth', googleOAuth);

export default router;
