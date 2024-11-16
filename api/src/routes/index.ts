import { Request, Response, Router } from 'express';
// import Stripe from 'stripe';

const { FRONTEND_URL, STRIPE_API_KEY } = process.env;

if (!FRONTEND_URL) {
  throw new Error('FRONTEND_URL is not defined');
}

if (!STRIPE_API_KEY) {
  throw new Error('STRIPE_API_KEY is not defined');
}

// const stripe = new Stripe(STRIPE_API_KEY);
const router = Router({ mergeParams: true });

const createCheckoutSessionMock = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Went to checkout!' });
};

// const createCheckoutSession = async (req: Request, res: Response) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//           price: '{{PRICE_ID}}',
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${FRONTEND_URL}?success=true`,
//       cancel_url: `${FRONTEND_URL}?canceled=true`,
//     });

//     if (session.url) {
//       res.redirect(303, session.url);
//     } else {
//       res.status(500).send('Failed to create checkout session');
//     }
//   } catch (e: any | unknown) {
//     res.status(500).send(`Error creating checkout session: ${e.message}`);
//   }
// };

router.get('/create-checkout-session', createCheckoutSessionMock);

export default router;
