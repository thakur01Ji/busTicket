import express from "express";
import { searchBuses } from "../controllers/searchController.js";

const router = express.Router();

// GET /api/search?from=1&to=5
router.get("/", searchBuses);

export default router;
