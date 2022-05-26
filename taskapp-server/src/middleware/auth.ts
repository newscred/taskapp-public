import { Request, Response, NextFunction } from 'express';
import { UserWithAuthToken, fetchUserForToken } from '../services/auth';
import { replyError } from '../utils';

// https://stackoverflow.com/a/47448486
declare global {
  namespace Express {
    interface Request {
      currentUser: UserWithAuthToken
    }
  }
}

export async function requiresLogin(req: Request, res: Response, next: NextFunction) {
  const authToken: string =
    req.headers && req.headers.authorization
      ? req.headers.authorization.slice(7) // "Bearer <token>"
      : null;
  if (!authToken) {
    return replyError(res, 403, { errors: [{ message: 'Require authorization' }] });
  }

  const currentUser = await fetchUserForToken(authToken);
  if (!currentUser) {
    return replyError(res, 403, { errors: [{ message: 'Invalid authorization' }] });
  } else {
    req.currentUser = currentUser;
  }
  next();
}
