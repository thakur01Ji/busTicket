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
