import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const prisma = new PrismaClient();

export const webhooks = async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'];
  let event;

  const endpointSecret =
    'whsec_957c717cf4be57cbe863fdd02e7df1f7707b57f1e36f6466c3684dca95b3ccb8';

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const sessionData = event.data.object;

      const newDonation = {
        sessionId: sessionData.id,
        donorEmail: sessionData.customer_details.email,
        amount: Number(sessionData.amount_total) / 100,
        type: sessionData.mode,
        paymentStatus: sessionData.status,
      };
      try {
        // Create Donation record
        const donation = await prisma.donation.create({
          data: newDonation,
        });
      } catch (error) {
        console.error('Error creating donation record', error);
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
};
