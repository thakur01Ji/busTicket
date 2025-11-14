import express from "express";
import { getAllFares, addFare } from "../controllers/fareController.js";

const router = express.Router();

router.get("/", getAllFares);
router.post("/", addFare);

export default router;
