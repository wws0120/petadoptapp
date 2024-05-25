import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import animalRoute from './routes/animalRoute';
import adoptionRoute from './routes/adoptionRoute';
import donationRoute from './routes/donationRoute';
import favoriteRoute from './routes/favoriteRoute';
import eventRoute from './routes/eventRoute';
import userRoute from './routes/userRoute';
import dashboardRoute from './routes/dashboardRoute';
import authRoute from './routes/authRoute';
import cloudinaryRoute from './routes/cloudinaryRoute';
import stripeRoute from './routes/stripeRoute';
import webhookRoute from './routes/webhookRoute';

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use('/webhook', express.raw({ type: 'application/json' }), webhookRoute);
app.use(express.json());

const corsOptions = {
  origin: [
    'http://localhost:5173/',
    'http://localhost:8080',
    'http://petadoptapp.vercel.app',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const corsConfig = {
  origin: [
    'http://localhost:5173/',
    'http://localhost:8080',
    'http://petadoptapp.vercel.app',
  ],
  credentials: true,
};
app.use(cors(corsConfig));
app.use(cookieParser());
// Handle preflight requests

app.use('/server/animals', animalRoute);
app.use('/server/users', userRoute);
app.use('/server/adoption', adoptionRoute);
app.use('/server/donation', donationRoute);
app.use('/server/events', eventRoute);
app.use('/server/auth', authRoute);
app.use('/server/favorite', favoriteRoute);
app.use('/server/dashboard', dashboardRoute);
app.use('/server/stripe', stripeRoute);
app.use('/server/cloudinary', cloudinaryRoute);

// port
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('server start at http://localhost:' + port);
});
