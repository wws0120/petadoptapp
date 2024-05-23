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
  origin: ['http://localhost:5173/', 'http://localhost:8080'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));
app.use(cookieParser());
// Handle preflight requests

app.use('/animals', animalRoute);
app.use('/users', userRoute);
app.use('/adoption', adoptionRoute);
app.use('/donation', donationRoute);
app.use('/events', eventRoute);
app.use('/auth', authRoute);
app.use('/favorite', favoriteRoute);
app.use('/dashboard', dashboardRoute);
app.use('/stripe', stripeRoute);
app.use('/cloudinary', cloudinaryRoute);

// port
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('server start at http://localhost:' + port);
});
