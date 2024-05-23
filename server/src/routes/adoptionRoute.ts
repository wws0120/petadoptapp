import { Router } from 'express';
import * as adoptionResolver from '../controllers/adoption';
import {
  verifyAdmin,
  verifyToken,
  verifyUserOrAdmin,
  verifyAdminOrManagement,
} from '../middlewares/auth';

const router = Router();

router.get(
  `/records/:userId`,
  [verifyToken, verifyAdminOrManagement],
  adoptionResolver.getAdoptionsByUser
);

router.get(
  `/records`,
  [verifyToken, verifyAdminOrManagement],
  adoptionResolver.getAllAdoptions
);

router.get(`/myadoptions`, [verifyToken], adoptionResolver.getMyAdoptions);

router.get(
  `/record/:id`,
  [verifyToken, verifyAdminOrManagement],
  adoptionResolver.getAdoptionRecord
);

router.post(`/:id/apply`, verifyToken, adoptionResolver.applyAdoption);

router.get(`/:id/status`, adoptionResolver.checkStatus);

router.put(
  `/:id/status`,
  [verifyToken, verifyAdminOrManagement],

  adoptionResolver.updateAdoptionStatus
);

router.delete(
  `/:id/delete`,
  [verifyToken, verifyAdminOrManagement],
  adoptionResolver.deleteAdoptionRecord
);

export default router;
