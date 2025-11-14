import { query } from "./baseController.js";

export const getAllLocations = async (req, res) => {
  try {
    const data = await query("SELECT * FROM locations;");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addLocation = async (req, res) => {
  try {
    const { name, boarding_point, village_town, tehsil, district, state, latitude, longitude, location_types } = req.body;
    await query(
      `INSERT INTO locations (name, boarding_point, village_town, tehsil, district, state, latitude, longitude, location_types)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, boarding_point, village_town, tehsil, district, state, latitude, longitude, JSON.stringify(location_types)]
    );
    res.json({ message: "Location added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLocationById = async (req, res) => {
  try {
    const [row] = await query("SELECT * FROM locations WHERE id = ?", [req.params.id]);
    if (!row) return res.status(404).json({ message: "Location not found" });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    await query("DELETE FROM locations WHERE id = ?", [req.params.id]);
    res.json({ message: "Location deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
