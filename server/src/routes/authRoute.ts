import { Router } from 'express';
import * as resolver from '../controllers/auth';

const router = Router();
router.post('/register', resolver.registUser);
router.post('/login', resolver.loginUser);
router.post('/logout', resolver.logoutUser);
router.get('/refresh', resolver.refreshToken);

module.exports = router;

export default router;
