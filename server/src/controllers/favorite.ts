import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function getMyFavoritelist(req: Request, res: Response) {
  const userId = req.user.id;
  try {
    const favoritelist = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        savedPetIds: true,
      },
    });

    const savedPets = await prisma.animal.findMany({
      where: {
        id: { in: favoritelist.savedPetIds },
      },
    });

    res.status(200).json(savedPets);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function addToFavorites(req: Request, res: Response) {
  const currentUser = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!currentUser) {
    return res.json({ message: 'User not exist' });
  }

  const { id: animalId } = req.params;

  if (!animalId || typeof animalId !== 'string') {
    return res.json({ message: 'Animal not exist' });
  }

  if (currentUser.savedPetIds) {
    currentUser.savedPetIds.map((animal) => {
      if (animal === animalId)
        return res.json({ message: 'This Pet is already added to favourites' });
    });
  }

  try {
    const updatedFavorites = await prisma.user.update({
      where: { id: currentUser.id },
      data: { savedPetIds: { push: animalId } },
    });

    res.json(updatedFavorites);
  } catch (err) {
    res.json(err);
  }
}

export const removeFavorite = async (req: Request, res: Response) => {
  const currentUser = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!currentUser) {
    return res.json({ message: 'User not exist' });
  }

  const animalId = req.params.id;

  if (!animalId || typeof animalId !== 'string') {
    return res.json({ message: 'Animal not exist' });
  }

  const user: any = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
    select: {
      savedPetIds: true,
    },
  });

  const savedPetsIds: any = user.savedPetIds;
  const updatedList = savedPetsIds.filter((id) => id !== animalId);
  try {
    const updatedFavorites = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        savedPetIds: {
          set: updatedList,
        },
      },
    });
    res.json(updatedFavorites);
  } catch (err) {
    res.json(err);
  }
};
