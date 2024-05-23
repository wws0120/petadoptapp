import { Router } from 'express';
import * as resolver from '../controllers/donation';
import {
  verifyToken,
  verifyAdmin,
  verifyAdminOrManagement,
} from '../middlewares/auth';

const router = Router();

router.get('/mydonations', [verifyToken], resolver.getMyDonations);

router.delete(
  '/delete/:id',
  [verifyToken, verifyAdmin],
  resolver.deleteDonationRecord
);

router.get(
  '/donationlist',
  [verifyToken, verifyAdminOrManagement],
  resolver.getDonationList
);

export default router;
