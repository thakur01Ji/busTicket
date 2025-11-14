import express from "express";
import { getAllRoutes, addRoute } from "../controllers/routeController.js";

const router = express.Router();

router.get("/", getAllRoutes);
router.post("/", addRoute);

export default router;
