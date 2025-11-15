import { query } from "./baseController.js";

export const createBusOwnerProfile = async (req, res) => {
  try {
    const { user_id, company_name, license_number, gst_number } = req.body;

    // find wallet
    const wallet = await query("SELECT id FROM user_wallets WHERE user_id = ?", [
      user_id
    ]);

    const wallet_id = wallet.length ? wallet[0].id : null;

    await query(
      `INSERT INTO bus_owner_profiles 
       (user_id, company_name, license_number, gst_number, wallet_id)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, company_name, license_number, gst_number, wallet_id]
    );

    res.json({ success:true,message: "Bus owner profile created" });

  } catch (err) {
        res.status(500).json({ success:false,message: err.message });
  }
};

export const getBusOwnerProfile = async (req, res) => {
  try {
    const data = await query(
      `SELECT * FROM bus_owner_profiles WHERE user_id = ?`,
      [req.params.user_id]
    );

    if (!data.length) return res.status(404).json({ success:false,message: "Not found" });
    res.json(data[0]);

  } catch (err) {
    res.status(500).json({ success:false,message: err.message });
  }
};

export const getAllBusOwners = async (_, res) => {
    try{
        console.log("Request for getting all bus owners is fired");
        const data = await query(
            `SELECT * FROM bus_owner_profiles;`
        );

        if (!data.length) return res.status(404).json({ message: "No bus owners found" });
        res.json({success:true,message:"Data is loaded",data : data});
    }catch(err){
        res.status(500).json({ success:false,message: err.message });
    }
}
