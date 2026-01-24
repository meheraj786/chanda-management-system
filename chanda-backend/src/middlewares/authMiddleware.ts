import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

interface CustomRequest extends Request {
  user?: IUser;
}

// Protect routes
export const protect = async (req: CustomRequest, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route. No token, no entry. Simple.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    req.user = await User.findById(decoded.id);

    if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found. Maybe they vanished after donating too much.' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route. Your token is as fake as our cause.' });
  }
};

// Optional auth to link donation to user
export const optionalAuth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      req.user = await User.findById(decoded.id);
    } catch (err) {
      // Don't throw an error, just move on without a user
    }
  }

  next();
};
