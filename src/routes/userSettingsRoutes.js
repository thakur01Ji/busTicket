import express from "express";
import {
  updateSetting,
  getSettings
} from "../controllers/userSettingsController.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth(["admin", "bus_owner", "customer"]), updateSetting);
router.get("/:user_id", auth(["admin", "bus_owner", "customer"]), getSettings);

export default router;
