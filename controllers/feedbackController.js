const connection = require("../config/database");

// Add a new feedback
exports.addFeedback = (req, res) => {
    const { product_id, user_id, comment, rating } = req.body;

    if (!product_id || !user_id || !comment || !rating) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // First, check if the product exists
    const checkProductQuery = "SELECT id FROM catalog WHERE id = ?";
    
    connection.query(checkProductQuery, [product_id], (err, results) => {
        if (err) {
            console.error("Error checking product:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(400).json({ error: "Product does not exist" });
        }

        // Insert the feedback
        const sql = "INSERT INTO feedbacks (product_id, user_id, comment, rating) VALUES (?, ?, ?, ?)";
        
        connection.query(sql, [product_id, user_id, comment, rating], (err, result) => {
            if (err) {
                console.error("Error adding feedback:", err);
                return res.status(500).json({ error: "Failed to add feedback" });
            }
            res.status(201).json({ message: "Feedback added successfully!", feedbackId: result.insertId });
        });
    });
};

// Get all feedbacks
exports.getAllFeedbacks = (req, res) => {
    const sql = "SELECT * FROM feedbacks";
    
    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching feedbacks:", err);
            return res.status(500).json({ error: "Failed to fetch feedbacks" });
        }
        res.status(200).json(results);
    });
};

// Update feedback
exports.updateFeedback = (req, res) => {
    const { id } = req.params;
    const { comment, rating } = req.body;

    if (!comment || !rating) {
        return res.status(400).json({ error: "Comment and rating are required" });
    }

    const sql = "UPDATE feedbacks SET comment = ?, rating = ? WHERE id = ?";
    
    connection.query(sql, [comment, rating, id], (err, result) => {
        if (err) {
            console.error("Error updating feedback:", err);
            return res.status(500).json({ error: "Failed to update feedback" });
        }
        res.status(200).json({ message: "Feedback updated successfully!" });
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
