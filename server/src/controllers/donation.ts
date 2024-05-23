import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getMyDonations = async (req: Request, res: Response) => {
  const userEmail = req.user.email;

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const donationList = await prisma.donation.findMany({
      where: {
        donorEmail: userEmail,
      },
    });

    res.json(donationList);
  } catch (err) {
    res.json(err);
  }
};

export const getDonationList = async (req, res) => {
  const { page } = req.query;

  const limit = 15;

  try {
    const donations = await prisma.donation.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    if (!donations?.length) {
      const result = {
        records: [],
        totalPages: 0,
      };
      return res.json(result);
    }

    const total = await prisma.donation.count();

    const totalPages = total <= limit ? 1 : Math.ceil(total / limit);
    const result = {
      donations,
      totalPages,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const deleteDonationRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedDonation = await prisma.donation.delete({
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
