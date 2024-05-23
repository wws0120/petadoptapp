import { Router } from 'express';
import * as resolver from '../controllers/event';
import { verifyToken, verifyAdminOrManagement } from '../middlewares/auth';

const router = Router();

router.get(`/`, resolver.getEvents);
router.get(`/eventlist`, resolver.getEventList);

router.get(`/:id`, resolver.getEventDetail);

router.post(
  `/create`,
  [verifyToken, verifyAdminOrManagement],
  resolver.createEvent
);

router.put(
  `/edit/:id`,
  [verifyToken, verifyAdminOrManagement],
  resolver.editEvent
);

router.put(
  `:id/status`,
  [verifyToken, verifyAdminOrManagement],
  resolver.updateEventStatus
);

router.delete(
  `/delete/:id`,
  [verifyToken, verifyAdminOrManagement],
  resolver.deleteSingleEvent
);

export default router;
