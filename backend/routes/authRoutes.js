import express from 'express';
import { signup, signin } from '../controllers/authController.js';

const router = express.Router();

// Route: POST /api/auth/signup
router.post('/signup', signup);

// Route: POST /api/auth/signin & /api/auth/login
router.post('/signin', signin);
router.post('/login', signin);

export default router;
