const connection = require('../config/database');

// SQL query to create the 'feedbacks' table if it doesn't exist
const createFeedbacksTable = `
    CREATE TABLE IF NOT EXISTS feedbacks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        user_id INT NOT NULL,
        rating INT CHECK (rating BETWEEN 1 AND 5),
        comment TEXT,
        admin_response TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES catalog(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;
`;

// Execute the query to create the table
connection.query(createFeedbacksTable, (err) => {
    if (err) {
        console.error('Error creating feedbacks table:', err.sqlMessage);
    }else{
        console.log('Feedbacks table created or already exists');}
});

// Define functions for interacting with the database
const Feedback = {
    getAll: (callback) => {
        const query = 'SELECT * FROM feedbacks';
        connection.query(query, callback);
    },

    getByProductId: (product_id, callback) => {
        const query = 'SELECT * FROM feedbacks WHERE product_id = ?';
        connection.query(query, [product_id], callback);
    },

    create: (feedback, callback) => {
        const query = 'INSERT INTO feedbacks (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)';
        connection.query(query, [feedback.product_id, feedback.user_id, feedback.rating, feedback.comment], callback);
    },
    respond: (feedback_id, response, callback) => {
        const query = 'UPDATE feedbacks SET admin_response = ? WHERE id = ?';
        connection.query(query, [response, feedback_id], callback);
    },


    delete: (feedback_id, callback) => {
        const query = 'DELETE FROM feedbacks WHERE id = ?';
        connection.query(query, [feedback_id], callback);
    }
};

module.exports = Feedback;
