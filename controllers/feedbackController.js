const connection = require("../config/database");

exports.getAllFeedbacks = (req, res) => {
    const sql = `
        SELECT 
            f.id, 
            f.product_id, 
            p.name AS product_name, 
            f.user_id, 
            u.username AS user_name, 
            f.comment, 
            f.rating, 
            f.admin_response, 
            f.created_at
        FROM feedbacks f
        JOIN catalog p ON f.product_id = p.id
        JOIN users u ON f.user_id = u.id
        ORDER BY f.created_at DESC;
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching feedbacks:", err);
            return res.status(500).json({ error: "Failed to fetch feedbacks" });
        }
        res.status(200).json(results);
    });
};
// admin respond to feedback or update admin response
exports.respondToFeedback = (req, res) => {
    const { id } = req.params;
    const { admin_response } = req.body;

    if (!admin_response) {
        return res.status(400).json({ error: "Response is required" });
    }

    const sql = "UPDATE feedbacks SET admin_response = ? WHERE id = ?";
    
    connection.query(sql, [admin_response, id], (err, result) => {
        if (err) {
            console.error("Error updating feedback response:", err);
            return res.status(500).json({ error: "Failed to update response" });
        }
        res.status(200).json({ message: "Response added successfully!" });
    });
};



// Delete feedback
exports.deleteFeedback = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM feedbacks WHERE id = ?";
    
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting feedback:", err);
            return res.status(500).json({ error: "Failed to delete feedback" });
        }
        res.status(200).json({ message: "Feedback deleted successfully!" });
    });
};
