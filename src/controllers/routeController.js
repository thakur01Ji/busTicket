import { query } from "./baseController.js";

export const getAllRoutes = async (req, res) => {
  try {
    const data = await query(`
      SELECT r.*, o.name AS origin, t.name AS destination
      FROM routes r
      JOIN locations o ON r.origin_location_id = o.id
      JOIN locations t ON r.terminating_location_id = t.id;
    `);
    res.json({success:true,message:"Data is loaded",data : data});
  } catch (err) {
    res.status(500).json({ success:false,message: err.message });
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
    res.json({success:true, message: "Route created successfully" });
  } catch (err) {
    res.status(500).json({success:false ,message: err.message });
  }
};

export const getAllRouteStops =async (req, res) =>{
  console.log("Request for getting all route stops is fired ");
  try{
    const { route_id } = req.params;
    // console.log("Route id is ", route_id);
    if(!route_id){
      return res.status(400).json({success : false, message: "Route id is required"});
    }

    const data = await query(
      `SELECT rs.location_id, rs.stop_order FROM route_stops rs WHERE rs.route_id = ? ORDER BY rs.stop_order ASC`,
      [route_id]
    );
    // console.log("Fetched route stops data ", data);
    res.json({success : true, message: "Data is loaded", data : data});
  }
  catch(err){
    console.log("Error occured while fetching route stops ", err);
    res.status(500).json({success : false, message: err.message });
  }
}
