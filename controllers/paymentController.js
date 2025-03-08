const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const connection = require("../config/database"); // DB connection

// Process Payment using Stripe
exports.processPayment = async (req, res) => {
  try {
    const { amount, currency, paymentMethodId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirm: true
    });

    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Save Payment Transaction in Database
exports.saveTransaction = (req, res) => {
  const { userId, transactionId, amount, status } = req.body;
  const query = "INSERT INTO payments (user_id, transaction_id, amount, status) VALUES (?, ?, ?, ?)";

  connection.query(query, [userId, transactionId, amount, status], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: "Database error" });
    }
    res.status(201).json({ success: true, message: "Transaction saved" });
  });
};

// Fetch User Payment History
exports.getPaymentHistory = (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT * FROM payments WHERE user_id = ?";

  connection.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: "Database error" });
    }
    res.status(200).json({ success: true, payments: results });
  });
};