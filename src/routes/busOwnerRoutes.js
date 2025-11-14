import express from "express";
import {
  createBusOwnerProfile,
  getBusOwnerProfile
} from "../controllers/busOwnerController.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

// Bus owners only
router.post("/", auth(["admin", "bus_owner"]), createBusOwnerProfile);
router.get("/:user_id", auth(["admin", "bus_owner"]), getBusOwnerProfile);

export default router;
