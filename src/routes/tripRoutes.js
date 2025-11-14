import express from "express";
import { getAllTrips, addTrip } from "../controllers/tripController.js";

const router = express.Router();

router.get("/", getAllTrips);
router.post("/", addTrip);

export default router;
