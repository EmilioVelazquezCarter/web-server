import { Router } from 'express';

const router = Router();

router.get('/info', (req, res) => {
  res.json({ version: '1.0', status: 'ok' });
});

router.get('/status', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

export default router;
