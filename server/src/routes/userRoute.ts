import { Router } from 'express';
import * as userController from '../controllers/user';
import {
  verifyAdmin,
  verifyToken,
  verifyUserOrAdmin,
  verifyAdminOrManagement,
} from '../middlewares/auth';

const router = Router();

router.get(
  '/userList',
  [verifyToken, verifyAdminOrManagement],
  userController.getUserList
);

router.get('/me', verifyToken, userController.getCurrentUser);

router.put('/me/image', verifyToken, userController.updateMyImage);

router.get('/myprofile', verifyToken, userController.getMyProfile);
router.put('/myprofile', verifyToken, userController.updateMyProfile);

router.post(
  '/edit/:id',
  [verifyToken, verifyUserOrAdmin],
  userController.editUser
);

router.delete(
  '/delete/:id',
  [verifyToken, verifyAdmin],
  userController.deleteUserById
);

router.get('/profile', userController.getUserProfile);
//router.put('/profile', verifyUserOrAdmin, userController.updateUserProfile);

router.get(
  '/:id/detail',
  [verifyToken, verifyAdmin],
  userController.getUserDetails
);

router.put(
  '/:id/status',
  [verifyToken, verifyAdmin],
  userController.updateUserStatus
);

router.put(
  '/:id/role',
  [verifyToken, verifyAdmin],
  userController.updateUserRole
);

export default router;
