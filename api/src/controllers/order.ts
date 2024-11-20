import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import { CreateCheckoutSessionBody, CreateCheckoutSessionParams, CreateCheckoutSessionQuery } from '../types/routes';
// import Stripe from 'stripe';

const { FRONTEND_URL, STRIPE_API_KEY } = process.env;

if (!FRONTEND_URL) {
  throw new Error('FRONTEND_URL is not defined');
}

if (!STRIPE_API_KEY) {
  throw new Error('STRIPE_API_KEY is not defined');
}

// const stripe = new Stripe(STRIPE_API_KEY);

export const createCheckoutSessionController = async (
  req: Request<CreateCheckoutSessionParams, unknown, CreateCheckoutSessionBody, CreateCheckoutSessionQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).send({ message: 'createCheckoutSession' });
  // const session = await stripe.checkout.sessions.create({
  //   line_items: [
  //     {
  //       // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
  //       price: '{{PRICE_ID}}',
  //       quantity: 1,
  //     },
  //   ],
  //   mode: 'payment',
  //   success_url: `${FRONTEND_URL}?success=true`,
  //   cancel_url: `${FRONTEND_URL}?canceled=true`,
  // });

  // if (session.url) {
  //   res.redirect(303, session.url);
  // } else {
  //   throw new Error('Failed to create checkout session');
  // }
};
