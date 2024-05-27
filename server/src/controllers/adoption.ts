import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllAdoptions = async (req: Request, res: Response) => {
  const { page } = req.query;
  const { status } = req.query;
  const limit = 15;

  const pageNumber = parseInt(page as string, 10); // Convert page to a number
  const skipAmount = (pageNumber - 1) * limit;

  try {
    const records = await prisma.adoptionRecord.findMany({
      skip: skipAmount,
      take: limit,
      where: status ? { status: { equals: status as string } } : undefined,
      select: {
        id: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        animal: {
          select: { id: true, name: true },
        },
        adopter: {
          select: { id: true, email: true },
        },
      },
    });

    if (!records?.length) {
      const result = {
        records: [],
        totalPages: 0,
      };
      return res.json(result);
    }

    const total = await prisma.adoptionRecord.count();
    const totalPages = total <= limit ? 1 : Math.ceil(total / limit);
    const result = {
      records,
      totalPages,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const getMyAdoptions = async (req: Request, res: Response) => {
  const userEmail = req.user.email;

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const adoptionList = await prisma.adoptionRecord.findMany({
      where: {
        adopterId: user.id,
      },
      include: { animal: true },
    });

    res.json(adoptionList);
  } catch (err) {
    res.json(err);
  }
};

export const getAdoptionsByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const records = await prisma.adoptionRecord.findMany();

  if (!records?.length) {
    return res.status(400).json({ message: 'No adoption record found' });
  }

  res.json(records);
};

export const applyAdoption = async (req: Request, res: Response) => {
  const currentUserId = req.user.id;
  const id = req.params.id;

  const existingAdoptionRecord = await prisma.adoptionRecord.findFirst({
    where: {
      animalId: id,
      adopterId: currentUserId,
    },
  });

  if (existingAdoptionRecord) {
    res.status(400).json({
      error:
        'Application for the same animal cannot be made twice. You have previously applied for this animal.',
    });
    return;
  }

  const result = await prisma.adoptionRecord.create({
    data: {
      animalId: id,
      adopterId: currentUserId,
      status: 'PENDING_APPROVAL',
    },
  });

  res.json(result);
};

export const updateAdoptionStatus = async (req: Request, res: Response) => {
  const adoptionId = req.params.id;

  const currentAdoption = await prisma.adoptionRecord.findUnique({
    where: { id: String(adoptionId) },
  });

  let newAnimalStatus;

  switch (req.body.status) {
    case 'APPROVED':
      newAnimalStatus = 'ADOPTED';
      break;
    case 'IN_PROGRESS':
      newAnimalStatus = 'RESERVED';
      break;
    case 'CANCELLED':
      newAnimalStatus = 'AVAILABLE';
      break;

    default:
      newAnimalStatus = 'AVAILABLE';
  }

  const result = await prisma.$transaction([
    prisma.animal.update({
      where: { id: String(currentAdoption.animalId) },
      data: {
        status: newAnimalStatus,
      },
    }),
    prisma.adoptionRecord.update({
      where: { id: String(adoptionId) },
      data: { status: req.body.status },
    }),
  ]);

  return res.status(200).json(result);
};

export const checkStatus = async (req: Request, res: Response) => {};

export const getAdoptionRecord = async (req, res) => {
  const recordId = req.params.id;

  try {
    const adoptionRecord = await prisma.adoptionRecord.findUnique({
      where: { id: recordId },
      include: {
        animal: true,
        adopter: {
          include: { userProfile: { include: { address: true } } },
        },
      },
    });

    if (!adoptionRecord) {
      return res.status(404).json({ message: 'Adoption record not found.' });
    }

    return res.status(200).json(adoptionRecord);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const deleteAdoptionRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedApotion = await prisma.adoptionRecord.delete({
      where: {
        id: String(id),
      },
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
