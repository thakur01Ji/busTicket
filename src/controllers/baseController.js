// src/controllers/baseController.js
import { pool } from "../db/db.js";

export async function query(sql, params = []) {
  const conn = await pool.getConnection();
  console.log("Acquirred Database Connection...");
  try {
    const rows = await conn.query(sql, params);
    return rows;
  } finally {
    console.log("Releasing database connection...");
    conn.release();
    console.log("Database connection released.");
  }
}
