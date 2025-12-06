import { Router } from 'express';
import { register, login } from '../controllers/authController.js';

// Router for authentication.  Provides sign‑up and sign‑in endpoints.
const router = Router();

// Sign‑up route: create a new user.
router.post('/signup', register);

// Sign‑in route: authenticate an existing user.
router.post('/signin', login);

export default router;