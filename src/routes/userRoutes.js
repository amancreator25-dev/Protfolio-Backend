import { Router } from "express";
import {
  changePassword,
  getCurrentUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  userLogin,
  userLogout
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// 🔓 Public routes
router.post("/register", registerUser);
router.post("/login", userLogin);

// 🔐 Protected routes
router.post("/logout", verifyJWT, userLogout);
router.post("/change-password", verifyJWT, changePassword);
router.get("/me", verifyJWT, getCurrentUser);
router.put("/account-details", verifyJWT, updateAccountDetails);

// 🔁 Refresh token (NO verifyJWT here)
router.post("/refresh-token", refreshAccessToken);

export default router;
