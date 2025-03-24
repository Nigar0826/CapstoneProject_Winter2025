document.addEventListener("DOMContentLoaded", function () {
    displayCart();
});

function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cartContainer.innerHTML = "";
    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.innerHTML = `
            <p>${item.name} - $${item.price} (x${item.quantity})</p>
        `;
        cartContainer.appendChild(itemElement);
    });
}

// Place Order Function
async function placeOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    try {
        const response = await fetch('/api/orders', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cart })
        });

        if (response.ok) {
            alert("Order placed successfully!");
            localStorage.removeItem("cart"); // Clear the cart after order
            displayCart();
        } else {
            alert("Failed to place order!");
        }
    } catch (error) {
        console.error("Error placing order:", error);
    }
}

// Clear Cart Function
function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
    alert("Cart cleared!");
}
