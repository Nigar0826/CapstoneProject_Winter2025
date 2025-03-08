// Wait until the DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // Initialize Stripe with the provided public key
    const stripe = Stripe("pk_test_51QjpL2Agr1xI6w0s4JunnP5gQDMgKQVc0P6fHNiWPW6PVq9omaXfdOeqmdPkFSkcxkFolvHJx2tUjo0WqHcjaUgr00VBX2SRjg");
    const elements = stripe.elements();

    // Create Stripe elements for card details input fields
    const cardNumber = elements.create("cardNumber", { style: { base: { fontSize: "16px" } } });
    const cardExpiry = elements.create("cardExpiry", { style: { base: { fontSize: "16px" } } });
    const cardCvc = elements.create("cardCvc", { style: { base: { fontSize: "16px" } } });

    // Mount Stripe elements to corresponding HTML elements
    cardNumber.mount("#card-number");
    cardExpiry.mount("#card-expiry");
    cardCvc.mount("#card-cvc");

    // Handle form submission for payment processing
    document.getElementById("payment-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        // Get payment amount from input field
        const amount = document.getElementById("amount").value;
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        try {
            // Send payment request to the backend
            const response = await fetch("http://localhost:4000/api/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: amount * 100, currency: "cad" }),
            });

            // Handle errors from the payment API
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Payment API error");
            }

            // Retrieve client secret from response for payment confirmation
            const { clientSecret } = await response.json();
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: cardNumber },
            });

            // Handle payment success or failure
            if (result.error) {
                alert(`Payment failed: ${result.error.message}`);
            } else {
                alert(`Payment successful! Payment ID: ${result.paymentIntent.id}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert(`Error: ${error.message}`);
        }
    });
});
