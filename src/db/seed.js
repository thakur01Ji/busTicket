import bcrypt from "bcrypt";
import { pool } from "./db.js";

async function seed() {
  const conn = await pool.getConnection();
  try {
    console.log("🌱 Seeding database...");

    // ----------------------------------------------
    // 1) ROLES
    // ----------------------------------------------
    await conn.query(`
      INSERT IGNORE INTO user_roles (role_key, description)
      VALUES 
      ('admin', 'System Administrator'),
      ('bus_owner', 'Owner of buses'),
      ('customer', 'Regular passenger');
    `);

    // ----------------------------------------------
    // 2) PERMISSIONS
    // ----------------------------------------------
    await conn.query(`
      INSERT IGNORE INTO user_permissions (role_key, permission_key, description)
      VALUES
      ('admin', 'manage_users', 'Full user management'),
      ('admin', 'manage_buses', 'Full bus management'),
      ('bus_owner', 'manage_own_buses', 'Manage assigned buses'),
      ('customer', 'book_tickets', 'Can book trips');
    `);

    // ----------------------------------------------
    // 3) USERS
    // ----------------------------------------------
    const adminPass = await bcrypt.hash("admin123", 10);
    const ownerPass = await bcrypt.hash("owner123", 10);
    const custPass = await bcrypt.hash("cust123", 10);

    // admin
    await conn.query(`
      INSERT IGNORE INTO users (id, name, email, phone, password_hash, role,is_active, is_verified)
      VALUES (1, 'Admin User', 'admin@test.com', '9999999999', '${adminPass}', 'admin', 1, 1)
    `);

    // bus owner
    await conn.query(`
      INSERT IGNORE INTO users (id, name, email, phone, password_hash, role)
      VALUES (2, 'Bus Owner', 'owner@test.com', '8888888888', '${ownerPass}', 'bus_owner')
    `);

    // customer
    await conn.query(`
      INSERT IGNORE INTO users (id, name, email, phone, password_hash, role)
      VALUES (3, 'Customer One', 'customer@test.com', '7777777777', '${custPass}', 'customer')
    `);

    // ----------------------------------------------
    // 4) WALLETS
    // ----------------------------------------------
    await conn.query(`
      INSERT IGNORE INTO user_wallets (user_id, balance)
      VALUES
      (1, 0.00),
      (2, 2500.00),
      (3, 100.00);
    `);

    // ----------------------------------------------
    // 5) BUS OWNER PROFILE
    // ----------------------------------------------
    await conn.query(`
      INSERT IGNORE INTO bus_owner_profiles (user_id, company_name, license_number, gst_number, wallet_id)
      SELECT 2, 'Express Travels', 'LIC12345', 'GST98765', id 
      FROM user_wallets WHERE user_id = 2
    `);

    // ----------------------------------------------
    // 6) CUSTOMER PROFILE
    // ----------------------------------------------
    await conn.query(`
      INSERT IGNORE INTO customer_profiles (user_id, referral_code, loyalty_points)
      VALUES (3, 'REF123', 50)
    `);

    // ----------------------------------------------
    // 7) ADMIN PROFILE
    // ----------------------------------------------
    await conn.query(`
      INSERT IGNORE INTO admin_profiles (user_id, super_admin, permissions)
      VALUES (1, TRUE, JSON_ARRAY('full_access'))
    `);

    // ----------------------------------------------
    // 8) USER SETTINGS
    // ----------------------------------------------
    await conn.query(`
      INSERT IGNORE INTO user_settings (user_id, setting_key, setting_value)
      VALUES
      (1, 'theme', 'dark'),
      (2, 'notification', 'enabled'),
      (3, 'language', 'en');
    `);

    console.log("✅ Seed completed!");

  } finally {
    conn.release();
  }
}

seed().catch(err => console.error(err));
