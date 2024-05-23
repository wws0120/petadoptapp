import { PrismaClient } from '@prisma/client';
import cloudinary from '../utils/cloudinary';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getUserList = async (req, res) => {
  const { page, status } = req.query;

  const limit = 15;

  try {
    const users = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: status ? { status: { equals: status } } : undefined,
    });

    if (!users?.length) {
      const result = {
        records: [],
        totalPages: 0,
      };
      return res.json(result);
    }

    const total = await prisma.user.count();
    const totalPages = total <= limit ? 1 : Math.ceil(total / limit);
    const result = {
      users,
      totalPages,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { email: req.user.email },
  });

  res.status(200).send(user);
};

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const foundUser = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        userProfile: { include: { address: true } },
      },
    });

    // Check that userProfile and address exist before destructuring
    let address = null;
    let userProfileData = null;
    let userData = { ...foundUser };

    if (foundUser.userProfile) {
      if (foundUser.userProfile.address) {
        address = foundUser.userProfile.address;
      }
      userProfileData = { ...foundUser.userProfile, address: undefined };
    }

    const responseObject = {
      data: {
        user: userData,
        userProfile: userProfileData,
        address: address,
      },
    };
    res.json(responseObject);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateMyProfile = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { user, userProfile, address } = req.body.payloads;

  try {
    const results = await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: user,
      }),
      prisma.userProfile.upsert({
        where: { userId: userId },
        update: userProfile,
        create: { ...userProfile, userId },
      }),
    ]);
    const updatedProfile = results[1];

    const addressResult = await prisma.address.upsert({
      where: { profileId: updatedProfile.id },
      update: address,
      create: { ...address, profileId: updatedProfile.id },
    });

    res
      .status(200)
      .json({ userProfile: updatedProfile, address: addressResult });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getUserInfo = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { email: req.user.email },
  });

  const responseData = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    imageUrl: user.imageUrl,
  };

  res.status(200).send(responseData);
};

export const getUserProfile = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { email: req.user.email },
  });
  const userProfile = await prisma.userProfile.findUnique({
    where: { userId: user.id },
  });

  res.status(200).send(userProfile);
};

export const getUserDetails = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userProfile: {
          include: { address: true },
        },
        adoptions: {
          include: {
            animal: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const userEmail = user.email;

    const donations = await prisma.donation.findMany({
      where: { donorEmail: userEmail },
    });

    const userDetails = { ...user, donations };

    return res.status(200).json(userDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const createUser = () => {};

export const editUser = () => {};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const result = await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });
    if (result) {
      res.status(200).json({ message: 'User deleted successfully' });
    }
  } catch (err) {
    res.json(err);
  }
};

export const updateUserImage = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  const result = await cloudinary.uploader.upload(file.path);
  const imageUrl = 'test';

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { imageUrl: result.secure_url },
  });

  const updatedUserImg = updatedUser.imageUrl;

  res.status(200).send(updatedUserImg);
};

export const updateMyImage = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const imageUrl = req.body.imageUrl;
  if (!imageUrl) {
    return res.status(400).send('No image uploaded');
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { imageUrl },
  });

  const updatedUserImg = updatedUser.imageUrl;

  res.status(200).send(updatedUserImg);
};

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const result = await prisma.user.update({
      where: {
        id: req.body.id,
      },
      data: { status: req.body.status },
    });
    if (result) {
      res.status(200).json({ user: result.status });
    }
  } catch (err) {
    res.json(err);
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  console.log('updaterolerun', req.body);
  try {
    const result = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: { role: req.body.role },
    });
    if (result) {
      console.log('result', result);
      res.status(200).json({ user: result.status });
    }
  } catch (err) {
    res.json(err);
  }
};
