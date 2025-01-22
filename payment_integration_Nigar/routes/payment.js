const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Load Stripe with the secret key

// POST /api/payment
router.post("/", async (req, res) => {
  const { amount, currency } = req.body;

  // Validate the request body
  if (!amount || !currency) {
    return res.status(400).json({
      error: "Invalid request. 'amount' and 'currency' are required fields.",
    });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"], 
    });

    // Send the client secret to the frontend
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).json({
      error: "Internal Server Error. Please try again later.",
    });
  }
});

module.exports = router;
