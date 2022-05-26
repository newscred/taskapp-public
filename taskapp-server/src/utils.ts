import { Response } from 'express';
import crypto from 'crypto';

export const randomString = (bytesSize: number = 32): string =>
  crypto.randomBytes(bytesSize).toString('hex');


  type Error = {
    message: string;
  };

  type ErrorResponse = {
    errors: Error[];
  };

export function replyError(res: Response, code: number, response: ErrorResponse) {
  return res.status(code).json(response);
}
