console.log("🚀 Script loaded!");

const API_CUSTOMERS = "http://localhost:4000/api/customers";
const API_USERS = "http://localhost:4000/api/users"; 


// Fetch customers from the backend
async function fetchCustomers() {
    try {
        const response = await fetch(API_CUSTOMERS);
        if (!response.ok) throw new Error("Failed to fetch customers");
        const customers = await response.json();
        displayCustomers(customers);
    } catch (error) {
        console.error("Error fetching customers:", error);
    }
}

// Display customers in the table
function displayCustomers(customers) {
    const tableBody = document.getElementById("customer-table-body");
    if (!tableBody) return;

    tableBody.innerHTML = ""; // Clear table body

    customers.forEach((customer) => {
        const row = document.createElement("tr");
        row.dataset.id = customer.id; // Store ID in row
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>
                <button  class="customer-edit-btn" onclick="editCustomer(this)">Edit</button>
                <button  class="customer-delete-btn" onclick="deleteCustomer(this)">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Edit customer WITHOUT adding a new one
function editCustomer(button) {
    const row = button.closest("tr");
    const customerId = row.dataset.id; // Get ID from dataset
    const name = row.cells[1].textContent.trim();
    const email = row.cells[2].textContent.trim();
    const phone = row.cells[3].textContent.trim();

    document.getElementById("customer-modal").style.display = "flex";
    document.getElementById("modal-title").textContent = "Edit Customer";
    document.getElementById("customer-name").value = name;
    document.getElementById("customer-email").value = email;
    document.getElementById("customer-phone").value = phone;

    document.getElementById("customer-form").dataset.mode = "edit";
    document.getElementById("customer-form").dataset.id = customerId; // Store ID
}

// Save or update customer
async function saveCustomer() {
    const name = document.getElementById("customer-name").value.trim();
    const email = document.getElementById("customer-email").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const formMode = document.getElementById("customer-form").dataset.mode;
    const customerId = document.getElementById("customer-form").dataset.id;

    if (!name || !email || !phone) {
        alert("All fields are required!");
        return;
    }

    const customerData = { name, email, phone };

    try {
        if (formMode === "add") {
            // Add a new customer
            const response = await fetch(API_CUSTOMERS, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(customerData),
            });
            if (!response.ok) throw new Error("Failed to add customer");
            alert("Customer added successfully!");
        } else if (formMode === "edit") {
            // Edit existing customer using stored ID
            const response = await fetch(`${API_CUSTOMERS}/${customerId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(customerData),
            });
            if (!response.ok) throw new Error("Failed to update customer");
            alert("Customer updated successfully!");
        }
    } catch (error) {
        console.error("Error saving customer:", error);
    }

    closeCustomerModal();
    fetchCustomers();
}

// Delete customer properly
async function deleteCustomer(button) {
    const row = button.closest("tr");
    const customerId = row.dataset.id; // Get ID from row

    if (confirm("Are you sure you want to delete this customer?")) {
        try {
            const response = await fetch(`${API_CUSTOMERS}/${customerId}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete customer");

            alert("Customer deleted successfully!");
            fetchCustomers(); // Refresh the customer list
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    }
}

// Show Add Customer Modal
function showAddCustomerModal() {
    document.getElementById("customer-modal").style.display = "flex";
    document.getElementById("modal-title").textContent = "Add Customer";
    document.getElementById("customer-form").reset();
    document.getElementById("customer-form").dataset.mode = "add";
}

// Close Modal
function closeCustomerModal() {
    document.getElementById("customer-modal").style.display = "none";
}
// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("customer-modal");
    if (event.target === modal) {
        closeCustomerModal();
    }
};

// Search customers
function searchCustomers() {
    const searchValue = document.getElementById("search-customers").value.toLowerCase();
    fetchCustomers().then(() => {
        const tableBody = document.getElementById("customer-table-body");
        [...tableBody.rows].forEach((row) => {
            const name = row.cells[1].textContent.toLowerCase();
            const email = row.cells[2].textContent.toLowerCase();
            const phone = row.cells[3].textContent.toLowerCase();

            if (name.includes(searchValue) || email.includes(searchValue) || phone.includes(searchValue)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
}

// Show the selected section in the dashboard
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach((section) => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}

// Load the correct section/page based on URL
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    if (path === "/payment") {
        document.getElementById("dashboard-layout").style.display = "none";
        document.getElementById("payment-layout").style.display = "block";
    } else {
        showSection("customers");
        fetchCustomers();
    }
});

// User Registration Function
async function registerUser() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !email || !password) {
        alert("All fields are required!");
        return;
    }

    const userData = { username, email, password };

    try {
        const response = await fetch("http://localhost:4000/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            alert(`User registered successfully!`);
            console.log("Redirecting to: /api/users/login");
            window.location.href = "/api/users/login"; 
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error("Registration Error:", error);
        alert("Failed to register. Try again.");
    }
}

// User Login Function
async function loginUser() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    try {
        const response = await fetch("http://localhost:4000/admin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Login successful! Token received:", data.token);
            localStorage.setItem("token", data.token); // Store token properly
            alert("Login successful!");
            window.location.href = "/admin"; // Redirect to profile
        } else {
            alert(`Login failed: ${data.error}`);
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("Login request failed.");
    }
}

// getUserProfile Function
async function getUserProfile() {
    console.log("getUserProfile() is being called!");
    
    const token = localStorage.getItem("token");
    console.log("LocalStorage Token:", token);

    if (!token) {
        console.error("No token found. Redirecting to login...");
        alert("Session expired. Please log in again.");
        window.location.href = "/api/users/login";
        return;
    }

    try {
        const response = await fetch("http://localhost:4000/api/users/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,  
                "Content-Type": "application/json"
            }
        });

        console.log("Response Status:", response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("User Data Received:", data);

        document.getElementById("profile-username").textContent = data.username;
        document.getElementById("profile-email").textContent = data.email;
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        alert("Session expired. Please log in again.");
        window.location.href = "/api/users/login";
    }
}

// Logout Function (Needed for clearing token and redirecting)
function logoutUser() {
    console.log("Logging out user...");
    localStorage.removeItem("token");  // Clear stored token
    alert("Logged out successfully!");
    window.location.href = "/api/users/login";  // Redirect to login page
}

// Ensure the function runs when the profile page loads
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("admin")) { 
        console.log("Profile page detected, fetching user data...");
        getUserProfile();
    }
});

// Attach functions to `window` so they are accessible in Console
window.logoutUser = logoutUser;
window.getUserProfile = getUserProfile;



