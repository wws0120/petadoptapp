import { Router } from 'express';
import * as dashboardResolver from '../controllers/dashboard';
import {
  verifyAdmin,
  verifyToken,
  verifyUserOrAdmin,
  verifyAdminOrManagement,
} from '../middlewares/auth';

const router = Router();

router.get(
  '/count',
  [verifyToken, verifyAdminOrManagement],
  dashboardResolver.getDashboardCounts
);

router.get(
  '/donationsummary',
  [verifyToken, verifyAdminOrManagement],
  dashboardResolver.getDonationSummary
);

router.get(
  '/recentanimals',
  [verifyToken, verifyAdminOrManagement],
  dashboardResolver.getRecentAnimals
);

router.get(
  '/activeadoptions',
  [verifyToken, verifyAdminOrManagement],
  dashboardResolver.getActiveAdoptions
);

export default router;
