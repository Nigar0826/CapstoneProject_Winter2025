
document.addEventListener("DOMContentLoaded", () => {
    fetchFeedbacks(); // Load feedbacks when the page loads
});
function fetchFeedbacks() {
    fetch("http://localhost:4000/api/feedbacks")
        .then(response => response.json())
        .then(data => {
            console.log("Feedback Data:", data);  // Debugging
            populateFeedbackTable(data);
        })
        .catch(error => console.error("Error fetching feedbacks:", error));
}

function populateFeedbackTable(feedbacks) {
    const tableBody = document.getElementById("feedback-table-body");
    tableBody.innerHTML = ""; // Clear the table before inserting new data

    feedbacks.forEach(feedback => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${feedback.product_id}</td>
            <td>${feedback.product_name}</td> 
            <td>${feedback.user_name}</td>  
            <td>${feedback.comment}</td>
            <td>${feedback.rating}</td>
            <td>${feedback.admin_response ? feedback.admin_response : "No response yet"}</td>
            <td>
                <button class="respond-btn" onclick="openResponseModal(${feedback.id}, '${feedback.admin_response}')">Respond</button>
                <button class="delete-btn" onclick="deleteFeedback(${feedback.id})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

let currentFeedbackId = null;

function openResponseModal(feedbackId, existingResponse) {
    currentFeedbackId = feedbackId;
    document.getElementById("admin-response").value = existingResponse;
    document.getElementById("response-modal").style.display = "flex";
}

function closeResponseModal() {
    document.getElementById("response-modal").style.display = "none";
}

function submitResponse() {
    const responseText = document.getElementById("admin-response").value.trim();

    if (!responseText) {
        alert("Response cannot be empty!");
        return;
    }

    fetch(`http://localhost:4000/api/feedbacks/${currentFeedbackId}/respond`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_response: responseText }),
    })
    .then(response => response.json())
    .then(data => {
        alert("Response updated successfully!");
        closeResponseModal();
        fetchFeedbacks(); // Reload feedbacks
    })
    .catch(error => console.error("Error updating response:", error));
}

function deleteFeedback(feedbackId) {
    if (!confirm("Are you sure you want to delete this feedback?")) return;

    fetch(`http://localhost:4000/api/feedbacks/${feedbackId}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            alert("Feedback deleted successfully!");
            fetchFeedbacks(); // Reload feedbacks
        })
        .catch(error => console.error("Error deleting feedback:", error));
}
