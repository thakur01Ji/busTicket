import { query } from "./baseController.js";

export const createAdminProfile = async (req, res) => {
  try {
    const { user_id, super_admin, permissions } = req.body;

    await query(
      `INSERT INTO admin_profiles (user_id, super_admin, permissions)
       VALUES (?, ?, ?)`,
      [user_id, super_admin ? 1 : 0, JSON.stringify(permissions)]
    );

    res.json({ message: "Admin profile created" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const data = await query("SELECT * FROM admin_profiles WHERE user_id = ?", [
      req.params.user_id
    ]);

    if (!data.length) return res.status(404).json({ message: "Not found" });

    res.json(data[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addRouteAndRouteStops = async (req,res) => {
    try{
        const { route, route_stops } = req.body;

        // console.log("First of all adding Route: ", route);

        try{
            const routeResult = await query(
                `INSERT INTO routes (name, description, origin_location_id, terminating_location_id)
                 VALUES (?, ?, ?, ?)`,
                [route.name, route.description, route.origin_location_id, route.terminating_location_id]
            );

            const routeId = routeResult.insertId;
            console.log("Route added with ID: ", routeId);

            for(const stop in route_stops){
                const routeStop = route_stops[stop];
                // console.log("Adding route stop: ", routeStop);

                await query(
                    `INSERT INTO route_stops (route_id, location_id, stop_order)
                     VALUES (?, ?, ?)`,
                    [routeId, routeStop.location_id, routeStop.stop_sequence]
                );
            }
        }catch(err){
            console.log("Error in adding route stops: ", err);
            throw err;
        }

        return res.json({ success : true, message: "Route and route stops added successfully" });
    }catch(err){
        console.log("Error in adding routes and route stations: ", err);
        res.status(500).json({ success:false,message: err.message });
    }
}

export const addBusAndBusStops = async ( req , res ) => {
    // console.log("Adding bus and bus stops request received: ", req.body);
    const { bus, bus_stops } = req.body;

    try{
        console.log("Adiing Bus: ");
        const busResult = await query(
            `INSERT INTO buses (name, bus_number, driver_name, conductor_name, bus_owner_id,bus_type, route_id,is_running,departure_time,arrival_time)`,
            [bus.name, bus.bus_number, bus.driver_name, bus.conductor_name, bus.bus_owner_id,bus.bus_type, bus.route_id,bus.is_running, bus.departure_time, bus.arrival_time]
        );

        // conosole.log("Bus added with ID: ", busResult.insertId);

        const busId = busResult.insertId;

        try{
            console.log("Adding bus stops: ");
            for(const stop in bus_stops){
                const busStop = bus_stops[stop];
                console.log("Adding bus stop: ", busStop);

                await query(
                    `INSERT INTO bus_stop_timings (bus_id, location_id, stop_order, arrival_time)
                     VALUES (?, ?, ?, ?, ?)`,
                    [busId, busStop.location_id, busStop.stop_order, busStop.arrival_time]
                );
            }
        }catch(err){
            console.log("Error in adding bus stops: ", err);
            throw err;
        }

        return res.json({ success : true, message: "Bus and bus stops added successfully" });
    }catch(err){
        console.log("Error in adding bus and bus stops: ", err);
        res.status(500).json({ success:false,message: err.message });
    }
}
