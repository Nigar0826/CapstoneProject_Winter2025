// Initialize Stripe with your Publishable Key
const stripe = Stripe("pk_test_51QjpL2Agr1xI6w0s4JunnP5gQDMgKQVc0P6fHNiWPW6PVq9omaXfdOeqmdPkFSkcxkFolvHJx2tUjo0WqHcjaUgr00VBX2SRjg");

// Create an instance of Elements
const elements = stripe.elements();

// Create individual fields for card details
const cardNumber = elements.create("cardNumber", {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
});
const cardExpiry = elements.create("cardExpiry", {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
});
const cardCvc = elements.create("cardCvc", {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
});

// Mount the fields to their respective divs
cardNumber.mount("#card-number");
cardExpiry.mount("#card-expiry");
cardCvc.mount("#card-cvc");

// Handle form submission
const form = document.getElementById("payment-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    // Fetch the client secret from your backend
    const response = await fetch("http://localhost:4000/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1000, currency: "usd" }), // Adjust amount/currency as needed
    });

    if (!response.ok) {
      throw new Error("Failed to fetch client secret from backend.");
    }

    const { clientSecret } = await response.json();

    // Confirm the card payment using the client secret
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumber, // Card details gathered from the individual fields
      },
    });

    if (result.error) {
      // Handle payment failure
      console.error("Payment failed:", result.error.message);
      alert(`Payment failed: ${result.error.message}`);
    } else {
      // Handle payment success
      console.log("Payment successful:", result.paymentIntent.id);
      alert(`Payment successful! Payment Intent ID: ${result.paymentIntent.id}`);
    }
  } catch (error) {
    console.error("Error during payment process:", error.message);
    alert(`Error: ${error.message}`);
  }
});
