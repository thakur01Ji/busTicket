import express from "express";
import { getAllLocations, addLocation, getLocationById, deleteLocation } from "../controllers/locationController.js";

const router = express.Router();

router.get("/", getAllLocations);
router.post("/", addLocation);
router.get("/:id", getLocationById);
router.delete("/:id", deleteLocation);

export default router;
