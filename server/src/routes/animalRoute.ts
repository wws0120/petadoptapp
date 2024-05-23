import { Router } from 'express';
import * as animalResolver from '../controllers/animal';
import * as favoriteResolver from '../controllers/favorite';
import { verifyToken, verifyAdminOrManagement } from '../middlewares/auth';

const router = Router();

router.get(`/`, animalResolver.getAnimals);
router.get(`/list`, animalResolver.getAnimalList);

router.post(
  '/',
  [verifyToken, verifyAdminOrManagement],
  animalResolver.createAnimal
);

router.get('/category', animalResolver.getRelatedAnimals);

router.get('/featured', animalResolver.getFeaturedAnimals);

router.post(`/fav/:animalId`, favoriteResolver.addToFavorites);

router.get(`/:id`, animalResolver.getAnimalById);

router.put(
  `/:id`,
  [verifyToken, verifyAdminOrManagement],
  animalResolver.updateAnimal
);

router.post(
  `/deleteSelected`,
  [verifyToken, verifyAdminOrManagement],
  animalResolver.deleteAnimalRecoed
);

export default router;
