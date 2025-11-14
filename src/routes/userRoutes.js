import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  deactivateUser,
  verifyUser
} from "../controllers/userController.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

// PUBLIC
router.post("/register", registerUser);
router.post("/login", loginUser);

// ADMIN ONLY
router.get("/", auth(["admin"]), getAllUsers);
router.get("/:id", auth(["admin"]), getUserById);
router.patch("/:id/deactivate", auth(["admin"]), deactivateUser);
router.patch("/:id/verify", auth(["admin"]), verifyUser);

export default router;
