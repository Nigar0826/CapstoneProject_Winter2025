
const API_URL = "http://localhost:3000/api/customers"; // Backend API URL

// Fetch customers from the back-end
function fetchCustomers() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch customers");
            }
            return response.json();
        })
        .then(customers => {
            displayCustomers(customers); // Pass backend data to display function
        })
        .catch(error => {
            console.error("Error fetching customers:", error);
        });
}

// Display customers in the table
function displayCustomers(customers) {
    const tableBody = document.getElementById("customer-table-body");
    tableBody.innerHTML = ""; // Clear table body

    customers.forEach(customer => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>
                <button onclick="editCustomer(${customer.id})">Edit</button>
                <button onclick="deleteCustomer(${customer.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Save or edit customer (for adding or updating data)
function saveCustomer() {
    const name = document.getElementById("customer-name").value.trim();
    const email = document.getElementById("customer-email").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const formMode = document.getElementById("customer-form").dataset.mode;
    const customerData = { name, email, phone };

    if (!name || !email || !phone) {
        alert("All fields are required!");
        return;
    }

    if (formMode === "add") {
        // Add a new customer
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customerData),
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to add customer");
                alert("Customer added successfully!");
                fetchCustomers(); // Refresh the customer list
            })
            .catch(error => console.error("Error adding customer:", error));
    } else if (formMode === "edit") {
        const customerId = document.getElementById("customer-form").dataset.id;
        // Update existing customer
        fetch(`${API_URL}/${customerId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customerData),
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to update customer");
                alert("Customer updated successfully!");
                fetchCustomers(); // Refresh the customer list
            })
            .catch(error => console.error("Error updating customer:", error));
    }

    closeCustomerModal();
}

// Edit customer (Prefill the modal form for editing)
function editCustomer(id) {
    fetch(`${API_URL}/${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch customer details");
            return response.json();
        })
        .then(customer => {
            document.getElementById("customer-modal").style.display = "flex";
            document.getElementById("modal-title").textContent = "Edit Customer";
            document.getElementById("customer-name").value = customer.name;
            document.getElementById("customer-email").value = customer.email;
            document.getElementById("customer-phone").value = customer.phone;

            document.getElementById("customer-form").dataset.mode = "edit";
            document.getElementById("customer-form").dataset.id = id;
        })
        .catch(error => console.error("Error fetching customer details:", error));
}

// Delete customer
function deleteCustomer(id) {
    if (confirm("Are you sure you want to delete this customer?")) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then(response => {
                if (!response.ok) throw new Error("Failed to delete customer");
                alert("Customer deleted successfully!");
                fetchCustomers(); // Refresh the customer list
            })
            .catch(error => console.error("Error deleting customer:", error));
    }
}

// Search customers (Filters displayed customers in the table)
function searchCustomers() {
    const searchValue = document.getElementById("search-customers").value.toLowerCase();
    document.querySelectorAll("#customer-table-body tr").forEach(row => {
        const name = row.children[1].textContent.toLowerCase();
        const email = row.children[2].textContent.toLowerCase();
        const phone = row.children[3].textContent.toLowerCase();
        row.style.display = (name.includes(searchValue) || email.includes(searchValue) || phone.includes(searchValue)) ? "" : "none";
    });
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

// Show the selected section
function showSection(sectionId) {
    const sections = document.querySelectorAll(".section");
    sections.forEach(section => section.style.display = "none");
    const activeSection = document.getElementById(sectionId);
    if (activeSection) activeSection.style.display = "block";
}

// Initialize the dashboard on page load
document.addEventListener("DOMContentLoaded", () => {
    showSection("customers"); // Default section
    fetchCustomers(); // Load customers from backend when page loads
});