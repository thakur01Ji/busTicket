import { query } from "./baseController.js";

export const getAllRoutes = async (req, res) => {
  try {
    const data = await query(`
      SELECT r.*, o.name AS origin, t.name AS destination
      FROM routes r
      JOIN locations o ON r.origin_location_id = o.id
      JOIN locations t ON r.terminating_location_id = t.id;
    `);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addRoute = async (req, res) => {
  try {
    const { name, description, origin_location_id, terminating_location_id } = req.body;
    await query(
      `INSERT INTO routes (name, description, origin_location_id, terminating_location_id)
       VALUES (?, ?, ?, ?)`,
      [name, description, origin_location_id, terminating_location_id]
    );
    res.json({ message: "Route created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
