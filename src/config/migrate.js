import { pool } from "../db/db.js";
import { schemaStatements } from "../db/schema.js";
import path from "path";
import fs from "fs/promises";
import { ENV } from "../config/env.js";
export async function migrateSchema() {
  const conn = await pool.getConnection();
  const dbName = ENV.DATABASE_NAME || "bus_ticket_db";
  try {
    // console.log("🔄 Running database migrations...");
    // const nowSchemaStatements = schemaStatements(dbName);
    // for (const stmt of nowSchemaStatements) {
    //   await conn.query(stmt);
    // }
    const sqlFileName = ENV.SCHEMA_MIGRATION_FILE || "mysql.sql";
    const filePath = path.resolve(__dirname, sqlFileName);

    console.log(`🔄 Running database migrations from file: ${filePath}`);

    // 2. Read the content of the SQL file
    const sqlContent = await fs.readFile(filePath, 'utf-8');

    // 3. Execute the entire content. 
    //    ⚠️ IMPORTANT: The connection pool MUST be configured 
    //    with 'multipleStatements: true' for this to work.
    await conn.query(sqlContent);
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
