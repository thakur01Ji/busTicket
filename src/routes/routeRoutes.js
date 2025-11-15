import express from "express";
import { getAllRoutes, addRoute, getAllRouteStops } from "../controllers/routeController.js";

const router = express.Router();

console.log("Route routes file loaded");
router.get("/stops/:route_id", getAllRouteStops);
router.get("/", getAllRoutes);
router.post("/", addRoute);

export default router;
