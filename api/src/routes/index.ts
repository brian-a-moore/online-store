import { Request, Response, Router } from "express";
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const { FRONTEND_URL } = process.env;

const router = Router({ mergeParams: true });

const createCheckoutSession = async (req: Request, res: Response) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${FRONTEND_URL}?success=true`,
    cancel_url: `${FRONTEND_URL}?canceled=true`,
  });

  res.redirect(303, session.url);
};

router.get("/create-checkout-session", createCheckoutSession);

export default router;
