import express from "express";
import {
  createCustomerProfile,
  getCustomerProfile
} from "../controllers/customerController.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth(["admin", "customer"]), createCustomerProfile);
router.get("/:user_id", auth(["admin", "customer"]), getCustomerProfile);

export default router;
