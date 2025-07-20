import express from "express";
import { verifyToken, getUserProfile } from "../controllers/authController.js";
import { checkJwt } from "../utils/jwtMiddleware.js";

const router = express.Router();

// Test Route (Public)
router.get("/test", (req, res) => {
  res.json({ message: "Auth Route Working " });
});

// Verify Token (Protected)
router.get("/verify", checkJwt, verifyToken);

// Get User Profile (Protected)
router.get("/profile", checkJwt, getUserProfile);

export default router;
