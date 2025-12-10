import express from "express";
import userController from "../controller/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", userController.register); // New user registration
router.post("/add", userController.addUser);       // Admin adds a user
router.post("/login", userController.login);       // User login

// Protected routes (require authentication)
router.patch("/update", auth, userController.update);      // Update user info
router.delete("/delete", auth, userController.deleteUser); // Delete user account
router.post("/authlogin", auth, userController.authLogin); // Check current authenticated user
router.post("/logout", auth, userController.logOut);       // Logout user

export default router;

