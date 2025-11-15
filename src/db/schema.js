// src/models/schema.js

export function schemaStatements (dbName = "bus_ticket_db") {
  return [
  `CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`,

  `USE \`${dbName}\`;`,

    // --- Users ---
  `CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin','bus_owner','customer') DEFAULT 'customer',
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS user_roles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    role_key varchar(50) UNIQUE NOT NULL,
    description varchar(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB;`,
  // --- Permissions linked to roles ---
  `CREATE TABLE IF NOT EXISTS user_permissions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role_key VARCHAR(50) NOT NULL,
    permission_key VARCHAR(100) NOT NULL,
    description TEXT,
    is_default BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_permissions_role (role_key),
    CONSTRAINT fk_user_permissions_role FOREIGN KEY (role_key)
      REFERENCES user_roles(role_key)
      ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB;`,


  `CREATE TABLE IF NOT EXISTS user_settings (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    setting_key VARCHAR(255) NOT NULL,
    setting_value VARCHAR(255) NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_user_setting (user_id, setting_key),
    INDEX idx_user_setting_user (user_id),
    CONSTRAINT fk_user_settings_user FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS user_wallets (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    balance DECIMAL(12,2) DEFAULT 0.00,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    currency VARCHAR(10) DEFAULT 'INR',
    INDEX idx_wallet_user (user_id),
    CONSTRAINT fk_user_wallets_user FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB;`,


  `CREATE TABLE IF NOT EXISTS bus_owner_profiles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    company_name VARCHAR(150),
    license_number VARCHAR(50),
    gst_number VARCHAR(30),
    verified BOOLEAN DEFAULT FALSE,
    commission_rate DECIMAL(5,2) DEFAULT 10.00,
    wallet_id INT UNSIGNED,
    INDEX idx_owner_user (user_id),
    CONSTRAINT fk_owner_user FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_owner_wallet FOREIGN KEY (wallet_id)
      REFERENCES user_wallets(id)
      ON DELETE SET NULL ON UPDATE CASCADE
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS customer_profiles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    referral_code VARCHAR(20),
    referred_by INT UNSIGNED,
    loyalty_points INT DEFAULT 0,
    preferred_language VARCHAR(10) DEFAULT 'en',
    INDEX idx_customer_user (user_id),
    CONSTRAINT fk_customer_user FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_customer_referrer FOREIGN KEY (referred_by)
      REFERENCES users(id)
      ON DELETE SET NULL ON UPDATE CASCADE
  ) ENGINE=InnoDB;`,


  `CREATE TABLE IF NOT EXISTS admin_profiles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    super_admin BOOLEAN DEFAULT FALSE,
    permissions JSON,
    INDEX idx_admin_user (user_id),
    CONSTRAINT fk_admin_user FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS user_payment_methods (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    method_type ENUM('card','upi','wallet','netbanking') NOT NULL,
    provider VARCHAR(100),
    account_identifier VARCHAR(255),
    meta JSON,
    is_default BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_payment_user (user_id),
    CONSTRAINT fk_payment_user FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB;`,

  // --- Bus Owners (linked to user) ---
  `CREATE TABLE IF NOT EXISTS bus_owners (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    company_name VARCHAR(255),
    wallet_balance DECIMAL(12,2) DEFAULT 0.00,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB;`,


  `CREATE TABLE IF NOT EXISTS locations (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    boarding_point VARCHAR(255) NOT NULL,
    village_town VARCHAR(255),
    tehsil VARCHAR(255),
    district VARCHAR(255),
    state VARCHAR(255),
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    location_types JSON NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_locations_name (name)
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS routes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    origin_location_id INT UNSIGNED NOT NULL,
    terminating_location_id INT UNSIGNED NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_routes_origin (origin_location_id),
    INDEX idx_routes_terminating (terminating_location_id),
    CONSTRAINT fk_routes_origin FOREIGN KEY (origin_location_id) REFERENCES locations (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_routes_terminating FOREIGN KEY (terminating_location_id) REFERENCES locations (id) ON DELETE RESTRICT ON UPDATE CASCADE
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS route_stops (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    route_id INT UNSIGNED NOT NULL,
    location_id INT UNSIGNED NOT NULL,
    stop_order INT UNSIGNED NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_route_stop (route_id, location_id),
    INDEX idx_route_stops_route (route_id),
    INDEX idx_route_stops_location (location_id),
    CONSTRAINT fk_route_stops_route FOREIGN KEY (route_id) REFERENCES routes (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_route_stops_location FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS buses (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bus_number VARCHAR(100) NOT NULL UNIQUE,
    driver_name VARCHAR(255),
    conductor_name VARCHAR(255),
    bus_owner_id INT UNSIGNED,
    bus_type ENUM('private','government','mini','express') NOT NULL DEFAULT 'private',
    route_id INT UNSIGNED,
    is_running TINYINT(1) NOT NULL DEFAULT 1,
    departure_time TIME,
    arrival_time TIME,
    round_trips_per_day INT UNSIGNED DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_buses_route (route_id),
    INDEX idx_buses_type (bus_type),
    CONSTRAINT fk_buses_route FOREIGN KEY (route_id) REFERENCES routes (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_buses_owner FOREIGN KEY (bus_owner_id) REFERENCES bus_owners (id) ON DELETE SET NULL ON UPDATE CASCADE
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS bus_stop_timings (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    bus_id INT UNSIGNED NOT NULL,
    location_id INT UNSIGNED NOT NULL,
    arrival_time TIME NOT NULL,
    stop_order INT UNSIGNED NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_bus_location (bus_id, location_id),
    INDEX idx_bus_stop_timings_bus (bus_id),
    INDEX idx_bus_stop_timings_location (location_id),
    CONSTRAINT fk_bus_stop_timings_bus FOREIGN KEY (bus_id) REFERENCES buses (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_bus_stop_timings_location FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS fares (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    route_id INT UNSIGNED NOT NULL,
    from_location_id INT UNSIGNED NOT NULL,
    to_location_id INT UNSIGNED NOT NULL,
    adult_fare DECIMAL(10,2) NOT NULL,
    child_fare DECIMAL(10,2),
    student_fare DECIMAL(10,2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_fares_route (route_id),
    INDEX idx_fares_from_location (from_location_id),
    INDEX idx_fares_to_location (to_location_id),
    CONSTRAINT fk_fares_route FOREIGN KEY (route_id) REFERENCES routes (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_fares_from FOREIGN KEY (from_location_id) REFERENCES locations (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_fares_to FOREIGN KEY (to_location_id) REFERENCES locations (id) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS trips (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    bus_id INT UNSIGNED NOT NULL,
    route_id INT UNSIGNED NOT NULL,
    trip_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME,
    status ENUM('running','active','stalled','closed','halted') NOT NULL DEFAULT 'active',
    current_location_id INT UNSIGNED,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_trips_bus (bus_id),
    INDEX idx_trips_route (route_id),
    INDEX idx_trips_date_status (trip_date, status),
    CONSTRAINT fk_trips_bus FOREIGN KEY (bus_id) REFERENCES buses (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_trips_route FOREIGN KEY (route_id) REFERENCES routes (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_trips_current_location FOREIGN KEY (current_location_id) REFERENCES locations (id) ON DELETE SET NULL ON UPDATE CASCADE
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS trip_stops (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    trip_id INT UNSIGNED NOT NULL,
    location_id INT UNSIGNED NOT NULL,
    stop_order INT UNSIGNED NOT NULL,
    scheduled_arrival TIME,
    actual_arrival TIME,
    scheduled_departure TIME,
    actual_departure TIME,
    adult_fare_from_origin DECIMAL(10,2) NOT NULL,
    child_fare_from_origin DECIMAL(10,2),
    student_fare_from_origin DECIMAL(10,2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_trip_stop (trip_id, location_id),
    INDEX idx_trip_stops_trip (trip_id),
    INDEX idx_trip_stops_location (location_id),
    CONSTRAINT fk_trip_stops_trip FOREIGN KEY (trip_id) REFERENCES trips (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_trip_stops_location FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB;`
];
}
