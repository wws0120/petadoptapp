import dotenv from 'dotenv';
import { v2 } from 'cloudinary';

dotenv.config();

const cloud_name = process.env.CLOUDINARY_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

export const cloudinary = v2.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
  secure: true,
});

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
export const SECRET = process.env.SECRET;
export const UPLOAD_PRESET = process.env.UPLOAD_PRESET || 'ml_default';
