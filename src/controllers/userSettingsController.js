import { query } from "./baseController.js";

export const updateSetting = async (req, res) => {
  try {
    const { user_id, setting_key, setting_value } = req.body;

    await query(
      `INSERT INTO user_settings (user_id, setting_key, setting_value)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
      [user_id, setting_key, setting_value]
    );

    res.json({ message: "Setting updated" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSettings = async (req, res) => {
  try {
    const settings = await query("SELECT * FROM user_settings WHERE user_id = ?", [
      req.params.user_id
    ]);
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
