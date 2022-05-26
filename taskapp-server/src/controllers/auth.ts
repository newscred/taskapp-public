import express from 'express';

import {
  UserCreateInput,
  createUser,
  DuplicateUsernameError,
  UserLoginInput,
  loginUser,
} from '../services/auth';
import { replyError } from '../utils';

const router = express.Router();

function validLogin(body: any): body is UserLoginInput {
  return body.username !== undefined && body.password !== undefined;
}

router.post('/login', async (req, res) => {
  if (validLogin(req.body)) {
    try {
      const user = await loginUser(req.body);
      res.status(200).json({ user });
    } catch (error) {
      replyError(res, 400, { errors: [{ message: 'Invalid login' } ] });
    }
  } else {
    replyError(res, 400, { errors: [{ message: 'Invalid login' } ] });
  }
});

function validSignUp(body: any): body is UserCreateInput {
  return (
    body.username !== undefined &&
    body.password !== undefined && body.password.length > 5 &&
    body.firstName !== undefined &&
    body.lastName !== undefined
  );
}

router.post('/sign-up', async (req, res) => {
  if (validSignUp(req.body)) {
    try {
      const user = await createUser(req.body);
      res.status(200).json({ user });
    } catch (e) {
      if (e instanceof DuplicateUsernameError) {
        replyError(res, 400, { errors: [{ message: e.message } ] });
      } else {
        console.error(e.stack);
        res.status(500).json({ message: 'There was an error' });
      }
    }
  } else {
    replyError(res, 400, { errors: [{ message: 'Invalid sign up' } ] });
  }
});

export { router };
