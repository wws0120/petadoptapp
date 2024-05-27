import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getDashboardCounts = async (req: Request, res: Response) => {
  try {
    const userCount = await prisma.user.count();
    const animalCount = await prisma.animal.count();
    const adoptedAnimalCount = await prisma.animal.count({
      where: {
        status: 'ADOPTED',
      },
    });
    const eventCount = await prisma.event.count();

    const counts = {
      userCount,
      animalCount,
      adoptedAnimalCount,
      eventCount,
    };

    res.status(200).json(counts);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const getDonationSummary = async (req: Request, res: Response) => {
  try {
    // Initiate the date six months ago
    const dateSixMonthsAgo = new Date();
    dateSixMonthsAgo.setDate(1);
    dateSixMonthsAgo.setHours(0, 0, 0, 0);
    dateSixMonthsAgo.setMonth(dateSixMonthsAgo.getMonth() - 5);

    // Get donations from the last six months
    const donations = await prisma.donation.findMany({
      where: {
        AND: [
          {
            createdAt: {
              gte: dateSixMonthsAgo,
            },
          },
          {
            OR: [
              { type: 'payment', paymentStatus: 'complete' },
              {
                type: 'subscription',
                paymentStatus: { in: ['active', 'cancelled'] },
              },
            ],
          },
        ],
      },
    });

    const startMonth = new Date();
    startMonth.setMonth(startMonth.getMonth() - 5); // Create a date six months ago
    startMonth.setDate(1); // Set the day to the first day of the month
    startMonth.setHours(0, 0, 0, 0); // Set the time to midnight

    const sixMonthDonations = donations.filter(
      ({ createdAt }) => new Date(createdAt) >= startMonth
    );

    const monthlyAmount = new Array(6).fill(0);

    for (let donation of sixMonthDonations) {
      const monthDiff =
        new Date().getMonth() - new Date(donation.createdAt).getMonth();
      const currentYear = new Date().getFullYear();
      const donationYear = new Date(donation.createdAt).getFullYear();
      const diffInMonths = (currentYear - donationYear) * 12;

      const index = 5 - (monthDiff + diffInMonths);
      monthlyAmount[index] += donation.amount;
    }

    const formatMonthlyDonations = (monthlyDonations) => {
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const currentMonthIndex = new Date().getMonth();

      return monthlyDonations.map((amount, i) => {
        const monthIndex = (currentMonthIndex - 5 + i + 12) % 12; // This ensures we loop around the year correctly
        const month = monthNames[monthIndex];
        return { month: month, amount: amount };
      });
    };

    // Apply the function to the result of the previous one
    const formattedMonthlyAmount = formatMonthlyDonations(monthlyAmount);

    // Getting the year to date total donations
    const dateCurrentYear = new Date();
    dateCurrentYear.setMonth(0);
    dateCurrentYear.setDate(1);
    dateCurrentYear.setHours(0, 0, 0, 0);

    const donationsCurrentYear = await prisma.donation.findMany({
      where: {
        createdAt: {
          gte: dateCurrentYear,
        },
      },
    });

    const totalDonationsCurrentYear = donationsCurrentYear.reduce(function (
      accumulator,
      donation
    ) {
      return accumulator + donation.amount;
    },
    0);

    // Getting active subscription count
    const subscriptionCount = await prisma.donation.count({
      where: {
        type: 'subscription',
        paymentStatus: 'active',
      },
    });

    // Return the combined data
    const combinedData = {
      formattedMonthlyAmount,
      totalDonationsCurrentYear,
      subscriptionCount,
    };

    res.status(200).json(combinedData);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const getRecentAnimals = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string);

  try {
    const animals = await prisma.animal.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json(animals);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const getActiveAdoptions = async (req: Request, res: Response) => {
  try {
    const adoptionRecords = await prisma.adoptionRecord.findMany({
      where: {
        status: {
          in: ['PENDING_APPROVAL', 'IN_PROGRESS'],
        },
      },
      include: {
        animal: true,
      },
    });

    res.status(200).json(adoptionRecords);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
