import { Router } from 'express';
import { checkUserAuth } from '../middlewares/auth';
import * as resolver from '../controllers/stripe';

const router = Router();

router.post(
  '/create-checkout-session',
  [checkUserAuth],
  resolver.createStripeSession
);

export default router;
