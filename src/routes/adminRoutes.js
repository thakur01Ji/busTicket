import express from "express";
import {
    addRouteAndRouteStops,
  createAdminProfile,
  getAdminProfile
} from "../controllers/adminController.js";

import { auth } from "../middleware/auth.js";

const router = express.Router();

// Only ADMIN can create an admin OR view admin profiles
router.post("/", auth(["admin"]), createAdminProfile);
router.get("/:user_id", auth(["admin"]), getAdminProfile);

router.post("/addRouteAndRouteStops", auth(["admin"]), addRouteAndRouteStops);
router.get("/addBusAndBusRoutes", auth(['admin']),addRouteAndRouteStops);

export default router;
