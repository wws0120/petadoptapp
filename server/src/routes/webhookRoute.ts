import express from 'express';
import { Router } from 'express';
import * as userController from '../controllers/webhooks';

const router = Router();
router.post(
  '/',
  express.raw({ type: 'application/json' }),
  userController.webhooks
);

export default router;
