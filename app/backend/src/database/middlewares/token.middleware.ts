import { Request, Response, NextFunction } from 'express';
import verifyToken from '../service/utils/jwt.verification';

export default async function tokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  try {
    const data = verifyToken(authorization as unknown as string);
    if (data) next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
