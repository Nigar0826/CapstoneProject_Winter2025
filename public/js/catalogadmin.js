document.addEventListener("DOMContentLoaded", function () {
    const catalogSection = document.getElementById("catalogadmin");
    if (!catalogSection) return;
  
    fetchProducts();
  
    const form = document.getElementById("add-product-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        addProduct();
      });
    }
  });
  
  let allProducts = [];
  
  // Fetch products
  async function fetchProducts() {
    try {
      const response = await fetch("/api/catalogadmin");
      const data = await response.json();
      console.log("Fetched products:", data);
  
      allProducts = data.catalog; 
      displayProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // Display Products
  function displayProducts(products) {
    const tableBody = document.getElementById("product-table-body");
    tableBody.innerHTML = "";
  
    products.forEach(product => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td>$${parseFloat(product.price).toFixed(2)}</td>
        <td>
          <button class="edit-btn" onclick="editProduct(${product.id})">Edit</button>
          <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }  
  
  // Search products
  function searchProducts() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const table = document.querySelector("table");
    if (!table) return;
  
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      const name = row.cells[1]?.textContent.toLowerCase();
      const description = row.cells[2]?.textContent.toLowerCase();
      const price = row.cells[3]?.textContent.toLowerCase();
  
      const matches =
        name.includes(query) ||
        description.includes(query) ||
        price.includes(query);
  
      row.style.display = matches ? "" : "none";
    });
  }
  
  // Add New product
  async function addProduct() {
    const name = document.getElementById("product-name").value.trim();
    const description = document.getElementById("product-description").value.trim();
    const price = parseFloat(document.getElementById("product-price").value);
  
    try {
      const res = await fetch("/api/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price })
      });
      if (!res.ok) throw new Error("Failed to add");
      alert("Product added!");
      document.getElementById("add-product-form").reset();
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }
  
  async function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;
    try {
      const res = await fetch(`/api/catalog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      alert("Deleted");
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }
  
  async function editProduct(id) {
    const product = allProducts.find(p => p.id === id);
    if (!product) return;
  
    const newName = prompt("New Name:", product.name);
    const newDesc = prompt("New Description:", product.description);
    const newPrice = prompt("New Price:", product.price);
  
    if (!newName || !newDesc || !newPrice) return;
  
    try {
      const res = await fetch(`/api/catalog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, description: newDesc, price: parseFloat(newPrice) })
      });
      if (!res.ok) throw new Error("Failed to update");
      alert("Product updated!");
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }
  