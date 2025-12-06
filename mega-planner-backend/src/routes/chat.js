import { Router } from 'express';
import { chat } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

// Router for chat interactions.  All chat requests require authentication.
const router = Router();

// POST /api/chat: send a prompt to the Grok API.  Only authenticated users
// may access this route.
router.post('/', protect, chat);

export default router;