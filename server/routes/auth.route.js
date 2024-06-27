import express from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { googleOAuth, signin, signout, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', authenticate, signout);
router.post('/google-oauth', googleOAuth);

export default router;
