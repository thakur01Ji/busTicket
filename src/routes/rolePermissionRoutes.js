import express from "express";
import { query } from "../controllers/baseController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// list roles
router.get("/roles", auth(["admin"]), async (_, res) => {
  const rows = await query("SELECT * FROM user_roles");
  res.json(rows);
});

// list permissions
router.get("/permissions", auth(["admin"]), async (_, res) => {
  const rows = await query("SELECT * FROM user_permissions");
  res.json(rows);
});

export default router;
