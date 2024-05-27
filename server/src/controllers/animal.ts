import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAnimals = async (req: Request, res: Response) => {
  try {
    const {
      limit,
      categories,
      sex,
      minAge,
      maxAge,
      minWeight,
      maxWeight,
      lastCursor,
    } = req.query;

    // Calculate the birth year for the minage and maxage
    const currentYear = new Date().getFullYear();
    const minBirthYear = minAge
      ? currentYear - parseInt(minAge as string)
      : undefined;
    const maxBirthYear = maxAge
      ? currentYear - parseInt(maxAge as string)
      : undefined;

    // Create date objects using the birth years
    const currentDate = new Date();
    const minDate = minBirthYear
      ? new Date(minBirthYear, currentDate.getMonth(), currentDate.getDate())
      : undefined;
    const maxDate = maxBirthYear
      ? new Date(maxBirthYear, currentDate.getMonth(), currentDate.getDate())
      : undefined;

    const categoriesString = typeof categories === 'string' ? categories : null;
    const categoriesArray = categoriesString
      ? categoriesString.split(',').map((item) => item.toUpperCase())
      : undefined;

    const result = await prisma.animal.findMany({
      take: limit ? parseInt(limit as string) : 18,
      ...(lastCursor && {
        skip: 1, // Do not include the cursor itself in the query result.
        cursor: {
          id: lastCursor as string,
        },
      }),
      where: {
        category: { in: categoriesArray ? categoriesArray : undefined },
        sex: sex ? (sex as string) : undefined,
        dateOfBirth: {
          gte: maxDate ? maxDate : undefined,
          lte: minDate ? minDate : undefined,
        },
        weight: {
          gte: minWeight ? parseInt(minWeight as string) : undefined,
          lte: maxWeight ? parseInt(maxWeight as string) : undefined,
        },
        status: 'AVAILABLE',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (result.length == 0) {
      return res
        .json({
          data: [],
          metaData: {
            lastCursor: null,
            hasNextPage: false,
          },
        })
        .status(200);
    }

    const lastPostInResults: any = result[result.length - 1];
    const cursor: any = lastPostInResults.id;

    const nextPage = await prisma.animal.findMany({
      // Same as before, limit the number of events returned by this query.
      take: limit ? parseInt(limit as string) : 10,
      skip: 1, // Do not include the cursor itself in the query result.
      cursor: {
        id: cursor,
      },
      where: {
        category: { in: categoriesArray ? categoriesArray : undefined },
        sex: sex ? (sex as string) : undefined,
        dateOfBirth: {
          gte: maxDate ? maxDate : undefined,
          lte: minDate ? minDate : undefined,
        },
        weight: {
          gte: minWeight ? parseInt(minWeight as string) : undefined,
          lte: maxWeight ? parseInt(maxWeight as string) : undefined,
        },
        status: 'AVAILABLE',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const data = {
      data: result,
      metaData: {
        lastCursor: cursor,
        hasNextPage: nextPage.length > 0,
      },
    };

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching animals:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const getAnimalList = async (req, res) => {
  const { page } = req.query;
  const limit = 15;
  try {
    const animals = await prisma.animal.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    if (!animals?.length) {
      return res.status(400).json({ message: 'No animal found' });
    }

    const total = await prisma.animal.count();

    const totalPages = total <= limit ? 1 : Math.ceil(total / limit);
    const result = {
      animals,
      totalPages,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching animals:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const getAnimalById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.json({
      message: 'animal not exist',
    });
    return;
  }

  try {
    const animal = await prisma.animal.findUnique({
      where: {
        id: String(id),
      },
    });

    res.status(200).json(animal);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const getRandomAnimal = async (req: Request, res: Response) => {
  try {
    const allAnimals = await prisma.animal.findMany();
    let randomIndex = Math.floor(Math.random() * allAnimals.length);

    res.json({ results: allAnimals[randomIndex] });
  } catch (err) {
    res.json(err);
  }
};

export const getRelatedAnimals = async (req: Request, res: Response) => {
  try {
    const category =
      typeof req.query.category === 'string' ? req.query.category : undefined;

    const relatedAnimals = await prisma.animal.findMany({
      where: {
        category: category,
      },
      take: 20,
    });

    res.status(200).json(relatedAnimals);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
export const getFeaturedAnimals = async (req: Request, res: Response) => {
  try {
    const category =
      typeof req.query.category === 'string' ? req.query.category : undefined;

    const animals = await prisma.animal.findMany({
      where: {
        category: category,
        status: 'AVAILABLE',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    res.status(200).json(animals);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const createAnimal = async (req: Request, res: Response) => {
  try {
    const savedAnimal = await prisma.animal.create({
      data: req.body,
    });
    res.status(200).json(savedAnimal);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const updateAnimal = async (req: Request, res: Response) => {
  const animalId = req.params.id;

  const updatedInfo = req.body;
  const updated = await prisma.animal.update({
    where: { id: animalId },
    data: updatedInfo,
  });

  if (updated) {
    res.json(updated);
  } else {
    res.status(400).json({ message: 'Animal update failed' });
  }
};

export const deleteAnimalRecoed = async (req: Request, res: Response) => {
  const idsToDelete = req.body.ids;

  try {
    const deletedAnimals = await prisma.animal.deleteMany({
      where: {
        id: {
          in: idsToDelete,
        },
      },
    });

    res.status(200).json(deletedAnimals);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
