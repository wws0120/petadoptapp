import { Request } from 'express';
import type { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: User;
    }
  }
}

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}
