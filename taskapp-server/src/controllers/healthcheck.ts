import express from 'express';

const router = express.Router();

router.get('/_status', (req, res) => {
  res.json({ message: 'OK' });
});

export { router };
