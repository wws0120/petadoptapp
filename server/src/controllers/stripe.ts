import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const prisma = new PrismaClient();

export const createStripeSessionOld = async (req: Request, res: Response) => {
  const donationAmount = req.body.amount;

  try {
    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      line_items: [
        {
          price_data: {
            currency: 'hkd',
            product_data: {
              name: 'donation',
            },
            unit_amount: donationAmount * 100,
          },

          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);

    res.status(200).json(session.id);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
};

export const createStripeSession = async (req: Request, res: Response) => {
  try {
    const donationAmount = req.body.amount;
    const donationType = req.body.paymentType; // either 'once' or 'monthly'
    const userEmail = req.user.email;
    const userId = req.user.userId;
    let line_items;
    const paymentMode = donationType === 'once' ? 'payment' : 'subscription';
    if (donationType === 'once') {
      line_items = [
        {
          price_data: {
            currency: 'hkd',
            product_data: {
              name: 'Donation',
            },
            unit_amount: donationAmount * 100,
          },
          quantity: 1,
        },
      ];
    } else if (donationType === 'monthly') {
      line_items = [
        {
          price_data: {
            currency: 'hkd',
            product_data: {
              name: 'Monthly Donation',
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: donationAmount * 100,
          },
          quantity: 1,
        },
      ];
    } else {
      throw new Error('Invalid donation type');
    }

    const params = {
      submit_type: 'pay',
      mode: paymentMode,
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      customer_email: userEmail,
      line_items,
      success_url: `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
    };

    // create the stripe session with provided params
    const session = await stripe.checkout.sessions.create(params);

    res.status(200).json(session.id);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
};
