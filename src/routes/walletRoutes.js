import express from "express";
import {
  getWallet,
  addBalance
} from "../controllers/walletController.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/:user_id", auth(["admin", "bus_owner", "customer"]), getWallet);
router.post("/add", auth(["admin"]), addBalance); // only admin adds balance

export default router;
