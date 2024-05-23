import { Router } from 'express';
import * as resolver from '../controllers/favorite';
import { verifyToken } from '../middlewares/auth';

const router = Router();

router.get(`/favoritelist`, verifyToken, resolver.getMyFavoritelist);

router.put(`/add/:id`, verifyToken, resolver.addToFavorites);

router.put(`/remove/:id`, verifyToken, resolver.removeFavorite);

export default router;
