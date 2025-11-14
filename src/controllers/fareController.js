import { query } from "./baseController.js";

export const getAllFares = async (req, res) => {
  try {
    const data = await query(`
      SELECT f.*, r.name AS route_name
      FROM fares f
      JOIN routes r ON f.route_id = r.id;
    `);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addFare = async (req, res) => {
  try {
    const { route_id, from_location_id, to_location_id, adult_fare, child_fare, student_fare } = req.body;
    await query(
      `INSERT INTO fares (route_id, from_location_id, to_location_id, adult_fare, child_fare, student_fare)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [route_id, from_location_id, to_location_id, adult_fare, child_fare, student_fare]
    );
    res.json({ message: "Fare added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
