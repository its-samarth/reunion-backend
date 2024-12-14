import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  interface AuthenticatedRequest extends Request {
    userId?: string; // Adding the optional  userId property
  }

  if (!token) {
    res.status(401).json({ message: 'Authorization token is required' });
    return;
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string }; // 'id' instead of 'userId'
    
    // Attach 'id' to 'userId' in the request
    const authReq = req as Request & { userId: string };
    authReq.userId = decoded.id;

    console.log("Decoded Token:", decoded);
    console.log("User ID attached to request:", authReq.userId);
    console.log("Type of userId in request:", typeof authReq.userId);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
