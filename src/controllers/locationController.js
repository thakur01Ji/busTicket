import { query } from "./baseController.js";

export const getAllLocations = async (req, res) => {
  try {
    const data = await query("SELECT * FROM locations;");
    res.json({success:true,message:"Data is loaded",data : data});
  } catch (err) {
    res.status(500).json({ success:false,message: err.message});
  }
};

export const addLocation = async (req, res) => {
    console.log("Request for adding a location is fired ", req.body, req.params );
  try {
    const { name, boarding_point, village_town, tehsil, district, state, latitude, longitude, location_types } = req.body;
    const result = await query(
      `INSERT INTO locations (name, boarding_point, village_town, tehsil, district, state, latitude, longitude, location_types)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, boarding_point, village_town, tehsil, district, state, latitude, longitude, JSON.stringify(location_types)]
    );
    console.log("Location added to database");
    const locationId = result.insertId;
    res.json({ success : true, message: "Location added successfully" });
  } catch (err) {
    res.status(500).json({ success:false,message: err.message});
  }
};

export const getLocationById = async (req, res) => {
  try {
    const [row] = await query("SELECT * FROM locations WHERE id = ?", [req.params.id]);
    if (!row) return res.status(404).json({ message: "Location not found" });
    res.json({success:true, message: "Data loaded",data:row});
  } catch (err) {
    res.status(500).json({ success:false,message: err.message});
  }
};

export const deleteLocation = async (req, res) => {
  try {
    await query("DELETE FROM locations WHERE id = ?", [req.params.id]);
    res.json({success:true, message: "Location deleted" });
  } catch (err) {
    res.status(500).json({ success:false,message: err.message});
  }
};
