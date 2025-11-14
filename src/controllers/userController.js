import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "./baseController.js";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    const exists = await query("SELECT id FROM users WHERE email = ?", [email]);
    if (exists.length > 0) return res.status(400).json({ message: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);

    const { insertId } = await query(
      `INSERT INTO users (name, email, phone, password_hash, role)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone, hash, role || "customer"]
    );

    // auto-create wallet
    await query(
      "INSERT INTO user_wallets (user_id) VALUES (?)",
      [insertId]
    );

    return res.json({ message: "User registered successfully", user_id: insertId });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const rows = await query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(400).json({ message: "Invalid credentials" });

    const user = rows[0];

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllUsers = async (_, res) => {
  try {
    const data = await query(`SELECT id, name, email, phone, role, is_active, is_verified, created_at FROM users`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const rows = await query("SELECT id, name, email, phone, role, is_active, is_verified FROM users WHERE id = ?", [
      req.params.id
    ]);
    if (!rows.length) return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deactivateUser = async (req, res) => {
  try {
    await query("UPDATE users SET is_active = 0 WHERE id = ?", [req.params.id]);
    res.json({ message: "User deactivated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    await query("UPDATE users SET is_verified = 1 WHERE id = ?", [req.params.id]);
    res.json({ message: "User marked verified" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
