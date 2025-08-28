const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const router = express.Router();
router.post(
  "/payment/process",
  catchAsyncErrors(async (req, res, next) => {
    const stripePayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "PKR",
      metadata: {
        company: "Becodemy",
      },
    });
    res.status(200).json({
      success: true,
      clientSecret: stripePayment.clientSecret,
    });
  })
);

// stripe api key
router.get(
  "/stripe-api-key",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  })
);

module.exports = router;
