import { query } from "./baseController.js";

export const searchBuses = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: "from and to location IDs are required" });
    }

    // 1️⃣ Get all routes where BOTH locations exist as stops
    const routes = await query(
      `
      SELECT DISTINCT r.id, r.name
      FROM routes r
      JOIN route_stops rs1 ON r.id = rs1.route_id AND rs1.location_id = ?
      JOIN route_stops rs2 ON r.id = rs2.route_id AND rs2.location_id = ?
      WHERE rs1.stop_order < rs2.stop_order
      `,
      [from, to]
    );

    if (!routes.length) {
      return res.json({ success: true, message: "No direct routes found", data: [] });
    }

    const routeIds = routes.map(r => r.id);

    // 2️⃣ Get buses running on those routes
    const buses = await query(
      `
      SELECT b.*, r.name AS route_name, o.company_name AS owner_company
      FROM buses b
      JOIN routes r ON b.route_id = r.id
      LEFT JOIN bus_owner_profiles o ON b.bus_owner_id = o.user_id
      WHERE b.route_id IN (?)
      `,
      [routeIds]
    );

    // 3️⃣ Fetch stop timings for each bus
    const busIds = buses.map(b => b.id);
    let timings = [];
    if (busIds.length) {
      timings = await query(
        `
        SELECT bst.*
        FROM bus_stop_timings bst
        WHERE bst.bus_id IN (?)
        ORDER BY bst.stop_order ASC
        `,
        [busIds]
      );
    }

    // 4️⃣ Fetch fares for this segment
    const fares = await query(
      `
      SELECT f.*, r.name as route_name
      FROM fares f
      JOIN routes r ON f.route_id = r.id
      WHERE f.from_location_id = ? AND f.to_location_id = ?
      `,
      [from, to]
    );

    return res.json({data: {
      routes: routes,
      buses: buses,
      timings: timings,
      fares: fares
    }, success:true, message: "Search results loaded" });

  } catch (err) {
    res.status(500).json({ success:false,message: err.message });
  }
};
