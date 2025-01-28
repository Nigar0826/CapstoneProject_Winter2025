
const API_URL = "http://localhost:5000/api/customers"; // Back-end API URL

// Fetch customers from the back-end
async function fetchCustomers() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch customers");
        const customers = await response.json();
        displayCustomers(customers); // Pass data to display function
    } catch (error) {
        console.error("Error fetching customers:", error);
    }
}

// Display customers in the table
function displayCustomers() {
    const tableBody = document.getElementById("customer-table-body");
    tableBody.innerHTML = ""; // Clear the table body

    customers.forEach((customer) => {
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

// Add or edit customer
async function saveCustomer() {
    const name = document.getElementById("customer-name").value.trim();
    const email = document.getElementById("customer-email").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const formMode = document.getElementById("customer-form").dataset.mode;

    if (!name || !email || !phone) {
        alert("All fields are required!");
        return;
    }

    const customerData = { name, email, phone };

    try 
    {     
        if (formMode === "add") {
            // Add a new customer
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-type:" : "application/json"
                },
                body: JSON.stringify(customerData)
            });
            if (!response.ok) throw new Error("Failed to add customer");
            alert("Customer added successfully!");          
        } else if (formMode === "edit") {
        // Edit existing customer
        const response = await fetch(`${API_URL}/${customerId}`, {
            method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(customerData)
            });        
        if (!response.ok) throw new Error("Failed to update customer");
            alert("Customer updated successfully!");
        }
    } catch (error) {
        console.error("Error saving customer: " , error);
    }

    closeCustomerModal();
    fetchCustomers();
}


// Edit customer
function editCustomer(id) {
    const customer = customers.find(c => c.id === id);
    if (!customer) return;

    document.getElementById("customer-modal").style.display = "flex";
    document.getElementById("modal-title").textContent = "Edit Customer";
    document.getElementById("customer-name").value = customer.name;
    document.getElementById("customer-email").value = customer.email;
    document.getElementById("customer-phone").value = customer.phone;

    // Set form mode and customer ID for editing
    document.getElementById("customer-form").dataset.mode = "edit";
    document.getElementById("customer-form").dataset.id = id;
}

// Delete customer
async function deleteCustomer(id) {
    if (confirm("Are you sure you want to delete this customer?")) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error("Failed to delete customer");
            alert("Customer deleted successfully!");
            fetchCustomers();
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
    document.getElementById("customer-form").dataset.mode = "add"; // Set mode to "add"
}

// Close Modal
function closeCustomerModal() {
    document.getElementById("customer-modal").style.display = "none";
}

// Initialize the Customers Section
document.addEventListener("DOMContentLoaded", fetchCustomers); // Display the initial customer list

// Search customers
function searchCustomers() {
    const searchValue = document.getElementById("search-customers").value.toLowerCase();
    const filtered = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchValue) ||
        customer.email.toLowerCase().includes(searchValue) ||
        customer.phone.toLowerCase().includes(searchValue)
    );

    displayCustomers(filtered);    

    // const tableBody = document.getElementById("customer-table-body");
    // tableBody.innerHTML = ""; // Clear table body

    // filtered.forEach((customer) => {
    //     const row = document.createElement("tr");
    //     row.innerHTML = `
    //         <td>${customer.id}</td>
    //         <td>${customer.name}</td>
    //         <td>${customer.email}</td>
    //         <td>${customer.phone}</td>
    //         <td>
    //             <button onclick="editCustomer(${customer.id})">Edit</button>
    //             <button onclick="deleteCustomer(${customer.id})">Delete</button>
    //         </td>
    //     `;
    //     tableBody.appendChild(row);
    // });
}


//Code from Fatima
// // Function to show the selected section
// function showSection(sectionId) {
//     // Hide all sections
//     const sections = document.querySelectorAll('.section');
//     sections.forEach(section => {
//         section.style.display = 'none'; // Hide all sections
//     });

//     // Show the selected section
//     const activeSection = document.getElementById(sectionId);
//     if (activeSection) {
//         activeSection.style.display = 'block'; // Display the selected section
//     }
// }

// // Sample customers data
// const customers = [
//     { id: 1, name: "John Loiuson", email: "john@example.com", phone: "123-456-7890" },
//     { id: 2, name: "Jane Smith", email: "jane12@example.com", phone: "987-654-3210" }
// ];