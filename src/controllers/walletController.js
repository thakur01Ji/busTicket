import { query } from "./baseController.js";

export const getWallet = async (req, res) => {
  try {
    const rows = await query("SELECT * FROM user_wallets WHERE user_id = ?", [
      req.params.user_id
    ]);

    if (!rows.length) return res.status(404).json({ message: "Wallet not found" });
    res.json(rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addBalance = async (req, res) => {
  try {
    const { user_id, amount } = req.body;

    await query(
      `UPDATE user_wallets SET balance = balance + ? WHERE user_id = ?`,
      [amount, user_id]
    );

    res.json({ message: "Wallet updated" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
