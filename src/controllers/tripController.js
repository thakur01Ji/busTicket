import { query } from "./baseController.js";

export const getAllTrips = async (req, res) => {
  try {
    const data = await query(`
      SELECT t.*, b.bus_number, r.name AS route_name
      FROM trips t
      JOIN buses b ON t.bus_id = b.id
      JOIN routes r ON t.route_id = r.id;
    `);
    res.json({success:true, message: "Data loaded",data:data});
  } catch (err) {
    res.status(500).json({ success:false,message: err.message });
  }
};

export const addTrip = async (req, res) => {
  try {
    const { bus_id, route_id, trip_date, start_time, status } = req.body;
    await query(
      `INSERT INTO trips (bus_id, route_id, trip_date, start_time, status)
       VALUES (?, ?, ?, ?, ?)`,
      [bus_id, route_id, trip_date, start_time, status]
    );
    res.json({ success:true,message: "Trip added successfully" });
  } catch (err) {
    res.status(500).json({ success:false,message: err.message });
  }
};
