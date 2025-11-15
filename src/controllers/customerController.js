import { query } from "./baseController.js";

export const createCustomerProfile = async (req, res) => {
  try {
    const { user_id, referral_code, referred_by } = req.body;

    await query(
      `INSERT INTO customer_profiles (user_id, referral_code, referred_by)
       VALUES (?, ?, ?)`,
      [user_id, referral_code, referred_by || null]
    );

    res.json({ message: "Customer profile created" });

  } catch (err) {
    res.status(500).json({ success:false,message: err.message });
  }
};

export const getCustomerProfile = async (req, res) => {
  try {
    const rows = await query("SELECT * FROM customer_profiles WHERE user_id = ?", [
      req.params.user_id
    ]);

    if (!rows.length) return res.status(404).json({ success:false,message: "Not found" });

    res.json(rows[0]);

  } catch (err) {
    res.status(500).json({ success:false,message: err.message });
  }
};
