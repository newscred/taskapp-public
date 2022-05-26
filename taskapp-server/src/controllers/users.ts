import express from 'express';

import { replyError } from '../utils';
import { requiresLogin } from '../middleware/auth';
import { getUser, deleteUser } from '../services/auth';

const router = express.Router();

router.get('/users/:id', requiresLogin, async (req, res) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    return replyError(res, 400, { errors: [{ message: 'Wrong id type' }] });
  }

  if (req.currentUser.role === 'admin') {
    const user = await getUser(userId);
    if (user !== null) {
      return res.status(200).json({ user });
    } else {
      return replyError(res, 404, { errors: [{ message: 'User not found' }] });
    }
  } else {
    return replyError(res, 403, { errors: [{ message: 'Unauthorized' }] });
  }
});

router.delete('/users/:id', requiresLogin, async (req, res) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    return replyError(res, 400, { errors: [{ message: 'Wrong id type' }] });
  }

  if (req.currentUser.role === 'admin') {
    await deleteUser(userId);
    res.status(204).json({ message: 'Deleted' });
  } else {
    return replyError(res, 403, { errors: [{ message: 'Unauthorized' }] });
  }
});


export { router };
