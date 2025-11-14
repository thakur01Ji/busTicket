import { pool } from "../db/db.js";
import { schemaStatements } from "../db/schema.js";
import { ENV } from "../config/env.js";
export async function migrateSchema() {
  const conn = await pool.getConnection();
  const dbName = ENV.DATABASE_NAME || "bus_ticket_db";
  try {
    console.log("🔄 Running database migrations...");
    const nowSchemaStatements = schemaStatements(dbName);
    for (const stmt of nowSchemaStatements) {
      await conn.query(stmt);
    }
    console.log("✅ Migration completed successfully!");
  } catch (err) {
    console.error("❌ Migration failed:", err.message);
    throw err;
  } finally {
    console.log("Releasing database connection...");
    conn.release();
    console.log("Database connection released.");
  }
}
