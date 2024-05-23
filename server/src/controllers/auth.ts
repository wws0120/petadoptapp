import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function registUser(req: Request, res: Response) {
  const email = req.body.payload.email;

  try {
    // check if user already exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.payload.password, salt);

    // create user
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        status: 'ACTIVE',
      },
    });
    return res
      .status(201)
      .json({ message: 'User created successfully', success: true });
  } catch (error: any) {
    return res.json({ message: error.message }, { status: 500 });
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user } = req.body;
  if (!user.email || !user.password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const formattedEmail = user.email.toLowerCase();
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: formattedEmail,
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
      },
    });

    if (!foundUser) {
      return res
        .status(401)
        .json({ msg: 'User E-mail or Password is incorrect' });
    }

    const passwordMatch = await bcrypt.compare(
      user.password,
      foundUser.password
    );

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ msg: 'User E-mail or Password is incorrect' });
    }

    const { password, ...responseUser } = foundUser;
    const accessToken = jwt.sign(
      {
        id: responseUser.id,
        email: responseUser.email,
        role: responseUser.role,
      },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: '2d' }
    );

    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      { expiresIn: '2d' }
    );

    // Create secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: 'None', //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    // Send accessToken containing username and roles
    res.json({ accessToken });
  } catch (err) {
    res.json(err);
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const foundUser = await prisma.user.findUnique({ where: { email } });

  if (!foundUser || foundUser.status !== 'ACTIVE') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const passwordMatch = await bcrypt.compare(password, foundUser.password);

  if (!passwordMatch) return res.status(401).json({ message: 'Unauthorized' });

  const accessToken = jwt.sign(
    {
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '20s' }
  );

  const refreshToken = jwt.sign(
    { email: foundUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '2h' }
  );

  // Create secure cookie with refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: 'None', //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  // Send accessToken containing username and roles
  res.json({ accessToken });
};

export const refreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });

      const foundUser = await prisma.user.findUnique({
        where: {
          email: decoded.email,
        },
      });

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

      const accessToken = jwt.sign(
        {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          imageUrl: foundUser.imageUrl,
        },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: '2d' }
      );

      res.json({ accessToken });
    }
  );
};

export const logoutUser = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.json({ message: 'Cookie cleared' });
};
