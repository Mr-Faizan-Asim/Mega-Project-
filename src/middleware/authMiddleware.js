import jwt from 'jsonwebtoken';
import User from '../models/user.js';

/**
 * Express middleware that protects routes by ensuring the request contains a
 * valid JWT.  The token should be supplied in the Authorization header as
 * `Bearer <token>`.  On success the decoded user document is attached to
 * `req.user`.  On failure an HTTP 401 response is sent.
 */
export async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, missing token' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
}