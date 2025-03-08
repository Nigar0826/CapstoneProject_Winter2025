const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

// // POST - Add Feedback
// router.post("/", feedbackController.addFeedback);

// GET - Retrieve All Feedbacks
router.get("/", feedbackController.getAllFeedbacks);

// PUT - Update Feedback by ID
// router.put("/:id", feedbackController.updateFeedback);

// PUT - Admin Responds to Feedback 
router.put("/:id/respond", feedbackController.respondToFeedback);

// DELETE - Delete Feedback by ID
router.delete("/:id", feedbackController.deleteFeedback);

module.exports = router;
