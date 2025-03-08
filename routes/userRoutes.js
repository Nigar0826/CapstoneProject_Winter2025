const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken, authorizeRole } = require("../middlewares/authMiddleware");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/profile", authenticateToken, userController.getUserProfile);
router.get("/", authenticateToken, authorizeRole("admin"), userController.getAllUsers);
router.put("/:id", authenticateToken, authorizeRole("admin"), userController.updateUser);
router.delete("/:id", authenticateToken, authorizeRole("admin"), userController.deleteUser);

module.exports = router;
