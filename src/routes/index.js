import express from "express";
import locationRoutes from "./locationRoutes.js";
import routeRoutes from "./routeRoutes.js";
import busRoutes from "./busRoutes.js";
import tripRoutes from "./tripRoutes.js";
import fareRoutes from "./fareRoutes.js";
import userRoutes from "./userRoutes.js";
import busOwnerRoutes from "./busOwnerRoutes.js";
import customerRoutes from "./customerRoutes.js";
import adminRoutes from "./adminRoutes.js";
import userSettingsRoutes from "./userSettingsRoutes.js";
import walletRoutes from "./walletRoutes.js";
import roleRoutes from "./rolePermissionRoutes.js";
import searchRoutes from "./searchRoutes.js";

const router = express.Router();

router.use("/locations", locationRoutes);
router.use("/routes", routeRoutes);
router.use("/buses", busRoutes);
router.use("/trips", tripRoutes);
router.use("/fares", fareRoutes);
router.use("/users", userRoutes);
router.use("/owner", busOwnerRoutes);
router.use("/customer", customerRoutes);
router.use("/admin", adminRoutes);
router.use("/settings", userSettingsRoutes);
router.use("/wallet", walletRoutes);
router.use("/auth", roleRoutes);
router.use("/search", searchRoutes);

export default router;
