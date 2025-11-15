/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.0.2-MariaDB, for osx10.20 (arm64)
--
-- Host: serverless-us-east1.sysp0000.db2.skysql.com    Database: bus_ticket
-- ------------------------------------------------------
-- Server version	11.8.3-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `admin_profiles`
--

DROP TABLE IF EXISTS `admin_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_profiles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `super_admin` tinyint(1) DEFAULT 0,
  `permissions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`permissions`)),
  PRIMARY KEY (`id`),
  KEY `idx_admin_user` (`user_id`),
  CONSTRAINT `fk_admin_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_profiles`
--

LOCK TABLES `admin_profiles` WRITE;
/*!40000 ALTER TABLE `admin_profiles` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `admin_profiles` VALUES
(1,1,1,'[\"full_access\"]');
/*!40000 ALTER TABLE `admin_profiles` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `bus_owner_profiles`
--

DROP TABLE IF EXISTS `bus_owner_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `bus_owner_profiles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `company_name` varchar(150) DEFAULT NULL,
  `license_number` varchar(50) DEFAULT NULL,
  `gst_number` varchar(30) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `commission_rate` decimal(5,2) DEFAULT 10.00,
  `wallet_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_owner_user` (`user_id`),
  KEY `fk_owner_wallet` (`wallet_id`),
  CONSTRAINT `fk_owner_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_owner_wallet` FOREIGN KEY (`wallet_id`) REFERENCES `user_wallets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_owner_profiles`
--

LOCK TABLES `bus_owner_profiles` WRITE;
/*!40000 ALTER TABLE `bus_owner_profiles` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `bus_owner_profiles` VALUES
(1,2,'Express Travels','LIC12345','GST98765',0,10.00,2);
/*!40000 ALTER TABLE `bus_owner_profiles` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `bus_owners`
--

DROP TABLE IF EXISTS `bus_owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `bus_owners` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `wallet_balance` decimal(12,2) DEFAULT 0.00,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bus_owners_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_owners`
--

LOCK TABLES `bus_owners` WRITE;
/*!40000 ALTER TABLE `bus_owners` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `bus_owners` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `bus_stop_timings`
--

DROP TABLE IF EXISTS `bus_stop_timings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `bus_stop_timings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bus_id` int(10) unsigned NOT NULL,
  `location_id` int(10) unsigned NOT NULL,
  `arrival_time` time NOT NULL,
  `stop_order` int(10) unsigned NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_bus_location` (`bus_id`,`location_id`),
  KEY `idx_bus_stop_timings_bus` (`bus_id`),
  KEY `idx_bus_stop_timings_location` (`location_id`),
  CONSTRAINT `fk_bus_stop_timings_bus` FOREIGN KEY (`bus_id`) REFERENCES `buses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_bus_stop_timings_location` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_stop_timings`
--

LOCK TABLES `bus_stop_timings` WRITE;
/*!40000 ALTER TABLE `bus_stop_timings` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `bus_stop_timings` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `buses`
--

DROP TABLE IF EXISTS `buses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `buses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `bus_number` varchar(100) NOT NULL,
  `driver_name` varchar(255) DEFAULT NULL,
  `conductor_name` varchar(255) DEFAULT NULL,
  `bus_owner_id` int(10) unsigned DEFAULT NULL,
  `bus_type` enum('private','government','mini','express') NOT NULL DEFAULT 'private',
  `route_id` int(10) unsigned DEFAULT NULL,
  `is_running` tinyint(1) NOT NULL DEFAULT 1,
  `departure_time` time DEFAULT NULL,
  `arrival_time` time DEFAULT NULL,
  `time_per_stop_minutes` int(10) unsigned DEFAULT 5,
  `round_trips_per_day` int(10) unsigned DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `bus_number` (`bus_number`),
  KEY `idx_buses_route` (`route_id`),
  KEY `idx_buses_type` (`bus_type`),
  KEY `fk_buses_owner` (`bus_owner_id`),
  CONSTRAINT `fk_buses_owner` FOREIGN KEY (`bus_owner_id`) REFERENCES `bus_owners` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_buses_route` FOREIGN KEY (`route_id`) REFERENCES `routes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buses`
--

LOCK TABLES `buses` WRITE;
/*!40000 ALTER TABLE `buses` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `buses` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `customer_profiles`
--

DROP TABLE IF EXISTS `customer_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_profiles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `referral_code` varchar(20) DEFAULT NULL,
  `referred_by` int(10) unsigned DEFAULT NULL,
  `loyalty_points` int(11) DEFAULT 0,
  `preferred_language` varchar(10) DEFAULT 'en',
  PRIMARY KEY (`id`),
  KEY `idx_customer_user` (`user_id`),
  KEY `fk_customer_referrer` (`referred_by`),
  CONSTRAINT `fk_customer_referrer` FOREIGN KEY (`referred_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_customer_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_profiles`
--

LOCK TABLES `customer_profiles` WRITE;
/*!40000 ALTER TABLE `customer_profiles` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `customer_profiles` VALUES
(1,3,'REF123',NULL,50,'en');
/*!40000 ALTER TABLE `customer_profiles` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `fares`
--

DROP TABLE IF EXISTS `fares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `fares` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `route_id` int(10) unsigned NOT NULL,
  `from_location_id` int(10) unsigned NOT NULL,
  `to_location_id` int(10) unsigned NOT NULL,
  `adult_fare` decimal(10,2) NOT NULL,
  `child_fare` decimal(10,2) DEFAULT NULL,
  `student_fare` decimal(10,2) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_fares_route` (`route_id`),
  KEY `idx_fares_from_location` (`from_location_id`),
  KEY `idx_fares_to_location` (`to_location_id`),
  CONSTRAINT `fk_fares_from` FOREIGN KEY (`from_location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_fares_route` FOREIGN KEY (`route_id`) REFERENCES `routes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_fares_to` FOREIGN KEY (`to_location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fares`
--

LOCK TABLES `fares` WRITE;
/*!40000 ALTER TABLE `fares` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `fares` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `boarding_point` varchar(255) NOT NULL,
  `village_town` varchar(255) DEFAULT NULL,
  `tehsil` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `location_types` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`location_types`)),
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_locations_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `locations` VALUES
(1,'Gangapur Bus Stop','Roadways Bus Stop','Gangapur','GAngapur','Gangapur','Rajasthan',NULL,NULL,'[\"bus_station\"]','2025-11-15 19:09:50','2025-11-15 19:09:50'),
(2,'Gangapur Bus Stop','Udai Mod','Gangapur','GAngapur','Gangapur','Rajasthan',NULL,NULL,'[\"bus_stop\"]','2025-11-15 19:16:30','2025-11-15 19:16:30'),
(3,'Badi Udai','Udai Badi Stop','Badi Udai','GAngapur','Gangapur','Rajasthan',NULL,NULL,'[\"bus_stop\"]','2025-11-15 19:19:51','2025-11-15 19:19:51'),
(4,'Kema City','Kema Stop','Kema','Kema','Karauli','Rajasthan',NULL,NULL,'[\"bus_stop\"]','2025-11-15 19:22:00','2025-11-15 19:22:00'),
(5,'Shahar City','Shahar  Stop','Shahar','Shahar','Karauli','Rajasthan',NULL,NULL,'[\"bus_stop\"]','2025-11-15 19:22:45','2025-11-15 19:22:45'),
(6,'Nadoti','Nadoti bus stand','Nadoti','Nadoti','Karauli','Rajasthan',NULL,NULL,'[\"bus_station\"]','2025-11-15 19:27:08','2025-11-15 19:27:08');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `route_stops`
--

DROP TABLE IF EXISTS `route_stops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `route_stops` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `route_id` int(10) unsigned NOT NULL,
  `location_id` int(10) unsigned NOT NULL,
  `stop_order` int(10) unsigned NOT NULL,
  `arrival_time` time DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_route_stop` (`route_id`,`location_id`),
  KEY `idx_route_stops_route` (`route_id`),
  KEY `idx_route_stops_location` (`location_id`),
  CONSTRAINT `fk_route_stops_location` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_route_stops_route` FOREIGN KEY (`route_id`) REFERENCES `routes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route_stops`
--

LOCK TABLES `route_stops` WRITE;
/*!40000 ALTER TABLE `route_stops` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `route_stops` VALUES
(1,2,1,1,NULL,'2025-11-15 20:21:06','2025-11-15 20:21:06'),
(2,2,2,2,NULL,'2025-11-15 20:21:06','2025-11-15 20:21:06'),
(3,2,3,3,NULL,'2025-11-15 20:21:07','2025-11-15 20:21:07'),
(4,2,4,4,NULL,'2025-11-15 20:21:07','2025-11-15 20:21:07'),
(5,2,5,5,NULL,'2025-11-15 20:21:08','2025-11-15 20:21:08');
/*!40000 ALTER TABLE `route_stops` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `routes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `origin_location_id` int(10) unsigned NOT NULL,
  `terminating_location_id` int(10) unsigned NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_routes_origin` (`origin_location_id`),
  KEY `idx_routes_terminating` (`terminating_location_id`),
  CONSTRAINT `fk_routes_origin` FOREIGN KEY (`origin_location_id`) REFERENCES `locations` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_routes_terminating` FOREIGN KEY (`terminating_location_id`) REFERENCES `locations` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routes`
--

LOCK TABLES `routes` WRITE;
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `routes` VALUES
(2,'Gangapur se shahar',NULL,1,5,'2025-11-15 20:21:05','2025-11-15 20:21:05');
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `trip_stops`
--

DROP TABLE IF EXISTS `trip_stops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `trip_stops` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `trip_id` int(10) unsigned NOT NULL,
  `location_id` int(10) unsigned NOT NULL,
  `stop_order` int(10) unsigned NOT NULL,
  `scheduled_arrival` time DEFAULT NULL,
  `actual_arrival` time DEFAULT NULL,
  `scheduled_departure` time DEFAULT NULL,
  `actual_departure` time DEFAULT NULL,
  `adult_fare_from_origin` decimal(10,2) NOT NULL,
  `child_fare_from_origin` decimal(10,2) DEFAULT NULL,
  `student_fare_from_origin` decimal(10,2) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_trip_stop` (`trip_id`,`location_id`),
  KEY `idx_trip_stops_trip` (`trip_id`),
  KEY `idx_trip_stops_location` (`location_id`),
  CONSTRAINT `fk_trip_stops_location` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_trip_stops_trip` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip_stops`
--

LOCK TABLES `trip_stops` WRITE;
/*!40000 ALTER TABLE `trip_stops` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `trip_stops` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `trips`
--

DROP TABLE IF EXISTS `trips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `trips` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bus_id` int(10) unsigned NOT NULL,
  `route_id` int(10) unsigned NOT NULL,
  `trip_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time DEFAULT NULL,
  `status` enum('running','active','stalled','closed','halted') NOT NULL DEFAULT 'active',
  `current_location_id` int(10) unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_trips_bus` (`bus_id`),
  KEY `idx_trips_route` (`route_id`),
  KEY `idx_trips_date_status` (`trip_date`,`status`),
  KEY `fk_trips_current_location` (`current_location_id`),
  CONSTRAINT `fk_trips_bus` FOREIGN KEY (`bus_id`) REFERENCES `buses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_trips_current_location` FOREIGN KEY (`current_location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_trips_route` FOREIGN KEY (`route_id`) REFERENCES `routes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trips`
--

LOCK TABLES `trips` WRITE;
/*!40000 ALTER TABLE `trips` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `trips` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `user_payment_methods`
--

DROP TABLE IF EXISTS `user_payment_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_payment_methods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `method_type` enum('card','upi','wallet','netbanking') NOT NULL,
  `provider` varchar(100) DEFAULT NULL,
  `account_identifier` varchar(255) DEFAULT NULL,
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`meta`)),
  `is_default` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_payment_user` (`user_id`),
  CONSTRAINT `fk_payment_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_payment_methods`
--

LOCK TABLES `user_payment_methods` WRITE;
/*!40000 ALTER TABLE `user_payment_methods` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `user_payment_methods` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `user_permissions`
--

DROP TABLE IF EXISTS `user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_key` varchar(50) NOT NULL,
  `permission_key` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_user_permissions_role` (`role_key`),
  CONSTRAINT `fk_user_permissions_role` FOREIGN KEY (`role_key`) REFERENCES `user_roles` (`role_key`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_permissions`
--

LOCK TABLES `user_permissions` WRITE;
/*!40000 ALTER TABLE `user_permissions` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `user_permissions` VALUES
(1,'admin','manage_users','Full user management',1,'2025-11-15 12:26:26'),
(2,'admin','manage_buses','Full bus management',1,'2025-11-15 12:26:26'),
(3,'bus_owner','manage_own_buses','Manage assigned buses',1,'2025-11-15 12:26:26'),
(4,'customer','book_tickets','Can book trips',1,'2025-11-15 12:26:26');
/*!40000 ALTER TABLE `user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_key` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_key` (`role_key`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `user_roles` VALUES
(1,'admin','System Administrator','2025-11-15 12:26:26'),
(2,'bus_owner','Owner of buses','2025-11-15 12:26:26'),
(3,'customer','Regular passenger','2025-11-15 12:26:26');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `user_settings`
--

DROP TABLE IF EXISTS `user_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `setting_key` varchar(255) NOT NULL,
  `setting_value` varchar(255) NOT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_user_setting` (`user_id`,`setting_key`),
  KEY `idx_user_setting_user` (`user_id`),
  CONSTRAINT `fk_user_settings_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_settings`
--

LOCK TABLES `user_settings` WRITE;
/*!40000 ALTER TABLE `user_settings` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `user_settings` VALUES
(1,1,'theme','dark','2025-11-15 12:26:30'),
(2,2,'notification','enabled','2025-11-15 12:26:30'),
(3,3,'language','en','2025-11-15 12:26:30');
/*!40000 ALTER TABLE `user_settings` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `user_wallets`
--

DROP TABLE IF EXISTS `user_wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_wallets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `balance` decimal(12,2) DEFAULT 0.00,
  `last_updated` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `currency` varchar(10) DEFAULT 'INR',
  PRIMARY KEY (`id`),
  KEY `idx_wallet_user` (`user_id`),
  CONSTRAINT `fk_user_wallets_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_wallets`
--

LOCK TABLES `user_wallets` WRITE;
/*!40000 ALTER TABLE `user_wallets` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `user_wallets` VALUES
(1,1,0.00,'2025-11-15 12:26:28','INR'),
(2,2,2500.00,'2025-11-15 12:26:28','INR'),
(3,3,100.00,'2025-11-15 12:26:28','INR');
/*!40000 ALTER TABLE `user_wallets` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','bus_owner','customer') DEFAULT 'customer',
  `is_active` tinyint(1) DEFAULT 1,
  `is_verified` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `users` VALUES
(1,'Admin User','admin@test.com','9999999999','$2b$10$EedLuDdmelcOUl5Dyl7rCu1O3rltkgMM5MKfYwfLQQiIZNAgtUZYO','admin',1,1,'2025-11-15 12:26:27'),
(2,'Bus Owner','owner@test.com','8888888888','$2b$10$rCbSwceIy1uXSZXlTW3OyubwNKNKjA4rHMgFVrgqMdUsf5jH4jO3u','bus_owner',1,0,'2025-11-15 12:26:28'),
(3,'Customer One','customer@test.com','7777777777','$2b$10$gJt9jGRN2xeFrg8Zc94uruO5OE9NAmSqcN9D00A5Z1w6YNlbqAXWi','customer',1,0,'2025-11-15 12:26:28');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-11-16  3:49:26
