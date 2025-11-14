import { query } from "./baseController.js";

export const getAllBuses = async (req, res) => {
  try {
    const data = await query(`
      SELECT b.*, r.name AS route_name , o.company_name AS owner_company
      FROM buses b 
      LEFT JOIN routes r ON b.route_id = r.id
      LEFT JOIN bus_owners o ON b.bus_owner_id = o.id;
    `);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addBus = async (req, res) => {
  try {
    const { name, bus_number, driver_name, conductor_name, bus_type, route_id } = req.body;
    await query(
      `INSERT INTO buses (name, bus_number, driver_name, conductor_name, bus_type, route_id, bus_owner_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, bus_number, driver_name, conductor_name, bus_type, route_id, bus_owner_id]
    );
    res.json({ message: "Bus added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
