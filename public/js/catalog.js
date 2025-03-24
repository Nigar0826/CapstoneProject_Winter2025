document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();
});

let allProducts = []; // Store fetched products

async function fetchProducts() {
    try {
        const response = await fetch('/api/catalog');
        const data = await response.json();
        allProducts = data.catalog; // Store products
        displayProducts(allProducts); // Display products
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Display Products function
function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Clear previous items

    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });
}

// Search function
function searchProducts() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
    );

    displayProducts(filteredProducts);
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
}
