import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { JwtPayload } from '../types/types';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // token stroed in cookies
  /*
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).send({
      message: 'You are not authenticated!',
    });
  }
  */

  // token stored in header

  let token;
  const { authorization } = req.headers;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = authorization.split(' ')[1];
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET
    ) as JwtPayload;

    if (!decoded.id) {
      return res.status(403).send({
        message: 'You are not authorized to perform this action',
      });
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Please authenticate.' });
  }
};

export const verifyUserOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.id === req.params.id || req.user.role === 'ADMIN') {
    next();
  } else {
    return res.status(403).send({
      message: 'You are not authorized to perform this action',
    });
  }
};

export const verifyAdmin = async (req, res, next) => {
  const user = req.user;
  if (user.role === 'ADMIN') {
    next(); // User is admin , proceed to the next middleware or route handler
  } else {
    return res.status(403).send({
      message: 'You are not authorized to perform this action',
    });
  }
};

export const verifyAdminOrManagement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user; // Assuming you have the user object available in the request
  if (user.role === 'ADMIN' || user.role === 'MANAGEMENT') {
    next(); // User is admin or management, proceed to the next middleware or route handler
  } else {
    res.status(403).json({ error: 'Access denied' }); // User is not authorized, return a 403 Forbidden status
  }
};

export const checkUserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }

  if (!token) {
    // No token found, treating as guest
    req.user = {
      email: 'anonymous@guest.account',
      name: 'anonymous',
      id: 'anonymous',
      password: 'anonymous',
      createdAt: new Date(),
      role: 'MEMBER',
      status: 'INACTIVE',
      imageUrl: null,
      savedPetIds: [],
    };
    return next(); // Proceed as guest
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    if (!decoded.id) {
      return res.status(403).send({
        message: 'You are not authorized to perform this action',
      });
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(404).send({
        message: 'User not found',
      });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Access denied' });
  }
};
