


document.addEventListener("DOMContentLoaded", async () => {
    if (document.getElementById("orders")) {
        await loadCustomers();
        await loadProducts();
        loadOrders();
    }
});

let customersMap ={};
let productsMap ={};

async function loadCustomers() {
    try {
        const response = await fetch("http://localhost:4000/api/customers");
        const data = await response.json();

        const select = document.getElementById("order-customer-id");
        select.innerHTML = '<option value="">Select customer</option>';

        data.forEach(customer => {
            const option = document.createElement("option");
            option.value = customer.id;
            option.textContent = `${customer.name} \u00A0\u00A0(${customer.email})`;
            select.appendChild(option);
            customersMap[customer.id] = 
            {name: customer.name,
            email: customer.email};
        });
    } catch (error) {
        console.error("Error loading customers:", error);
    }
}

async function loadProducts() {
    try {
        const response = await fetch("http://localhost:4000/api/catalog");
        const data = await response.json();

        const select = document.getElementById("order-product-id");
        select.innerHTML = '<option value="">Select product</option>';

        data.catalog.forEach(product => {
            const option = document.createElement("option");
            option.value = product.id;
            option.textContent = product.name;
            select.appendChild(option);
            productsMap[product.id] = product.name;
        });
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

async function loadOrders() {
    try {
        const response = await fetch("http://localhost:4000/api/orders");
        const data = await response.json();

        const tableBody = document.getElementById("order-table-body");
        tableBody.innerHTML = "";

        data.orders.forEach(order => {
            
            const customer = customersMap[order.customer_id];
            const customerName = customer ? customer.name : order.customer_id;
            const customerEmail = customer ? customer.email : '';
            const productName = productsMap[order.product_id] || order.product_id;

            const row = `
                <tr>
                    <td>${order.id}</td>
                    <td>${customerName}</td>
                    <td>${customerEmail}</td>
                    <td>${productName}</td>
                    <td>${order.quantity}</td>
                    <td>${new Date(order.order_date).toLocaleString()}</td>
                    <td>${order.status || 'Pending'}</td>
                    <td>
                        <div class="order-action-buttons">
                        <button class="order-edit-btn" onclick="editOrder(${order.id}, ${order.customer_id}, ${order.product_id}, ${order.quantity}, '${(order.status || "Pending").replace(/'/g, "\\'")}')">Edit</button>
                        <button class="order-delete-btn" onclick="deleteOrder(${order.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Failed to load orders:", error);
    }
}

async function deleteOrder(id) {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
        const response = await fetch(`http://localhost:4000/api/orders/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Order deleted successfully");
            loadOrders();
        } else {
            const errorData = await response.json();
            alert("Error deleting order: " + errorData.message);
        }
    } catch (error) {
        console.error("Delete failed:", error);
        alert("Something went wrong.");
    }
}

//###############################################################################################################
// Update order function
async function updateOrder(id) {
    const customerId = document.getElementById("order-customer-id").value;
    const productId = document.getElementById("order-product-id").value;
    const quantity = document.getElementById("order-quantity").value;
    const status = document.getElementById("order-status").value;

    if (!customerId || !productId || !quantity || !status) {
        alert("All fields are required.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:4000/api/orders/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customer_id: customerId,
                product_id: productId,
                quantity,
                status
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Order updated successfully!");
            closeOrderModal();
            loadOrders();
        } else {
            alert("Failed to update order: " + result.message);
        }
    } catch (error) {
        console.error("Error updating order:", error);
        alert("Something went wrong while updating the order.");
    }

    // Reset button
    const saveBtn = document.querySelector("#order-form button");
    saveBtn.textContent = "Save";
    saveBtn.onclick = saveOrder;
}

//############################################################################################################### 
// this is the code for adding order modal
function showAddOrderModal() {
    document.getElementById("order-modal").style.display = "block";
}

function closeOrderModal() {
    document.getElementById("order-modal").style.display = "none";
}

async function saveOrder() {
    const customerId = document.getElementById("order-customer-id").value;
    const productId = document.getElementById("order-product-id").value;
    const quantity = document.getElementById("order-quantity").value;
    const status = document.getElementById("order-status").value;

    if (!customerId || !productId || !quantity || !status) {
        alert("All fields are required.");
        return;
    }

    try {
        const response = await fetch("http://localhost:4000/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customer_id: customerId,
                product_id: productId,
                quantity,
                status
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Order added successfully!");
            closeOrderModal();
            loadOrders(); // Refresh the order table
        } else {
            alert("Failed to add order: " + result.message);
        }
    } catch (error) {
        console.error("Error adding order:", error);
        alert("Something went wrong while adding the order.");
    }
}
 //################################################################################################################
 // Edit order modal    
 function editOrder(id, customerId, productId, quantity, status) {

    document.getElementById("order-customer-id").value = customerId;
    document.getElementById("order-product-id").value = productId;
    document.getElementById("order-quantity").value = quantity;
    document.getElementById("order-status").value = status;

    showAddOrderModal();

    const saveBtn = document.querySelector("#order-form button");
    saveBtn.textContent = "Update";
    saveBtn.onclick = () => updateOrder(id);
}


//##############################################################################################################
function searchOrders() {
    const input = document.getElementById("search-orders").value.toLowerCase();
    const table = document.getElementById("order-table-body");
    const rows = table.getElementsByTagName("tr");

    for (let row of rows) {
        const cells = row.getElementsByTagName("td");
        const customerName = cells[1]?.textContent.toLowerCase();
        const productName = cells[3]?.textContent.toLowerCase();
        const status = cells[6]?.textContent.toLowerCase();

        if (
            customerName.includes(input) ||
            productName.includes(input) ||
            status.includes(input)
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}
//##############################################################################################################