import express from "express";
import { getAllBuses, addBus } from "../controllers/busController.js";

const router = express.Router();

router.get("/", getAllBuses);
router.post("/", addBus);

export default router;
