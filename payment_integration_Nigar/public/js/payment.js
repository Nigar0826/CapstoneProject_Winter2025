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
      body: JSON.stringify({ amount: 1000, currency: "cad" }), 
    });

    if (!response.ok) {
      throw new Error("Failed to fetch client secret from backend.");
    }

    const { clientSecret } = await response.json();

    // Confirm the card payment using the client secret
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumber, 
      },
    });

    if (result.error) {
      // Debugging: Log the full error object
      console.log("Error Object:", result.error);

      // Handle payment failure with custom messages
      if (result.error.type === "card_error" && result.error.code === "expired_card") {
        alert("Invalid payment. Your card is expired.");
      } else {
        alert(`Payment failed: ${result.error.message}`);
      }
    } else {
      // Handle payment success
      console.log("Payment successful:", result.paymentIntent.id);
      alert(`Payment successful! Payment ID: ${result.paymentIntent.id}`);
    }
  } catch (error) {
    console.error("Error during payment process:", error.message);
    alert(`Error: ${error.message}`);
  }
});
