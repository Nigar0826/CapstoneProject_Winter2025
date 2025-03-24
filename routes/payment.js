const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Payment API (POST) - Works at `/api/payment`
router.post("/", async (req, res) => {
    try {
        const { amount, currency } = req.body;

        if (!amount || !currency || amount <= 0) {
            return res.status(400).json({ error: "Invalid payment details" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ["card"],
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
