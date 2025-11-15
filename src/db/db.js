import mariadb from "mariadb";
import { ENV } from "../config/env.js";

const dbUrl = new URL(ENV.DATABASE_URL);
const dbCount = ENV.DATABASE_NUMBER || 0;

let database_host;
let database_port;
let database_user;
let database_password;
let database_name;
let database_ssl;
console.log("DATABASE_NUMBER:", dbCount);
if(dbCount == 1){
    console.log("Using separate DB config from ENV variables");
    database_host = ENV.DATABASE_HOST;
    database_port = ENV.DATABASE_PORT;
    database_user = ENV.DATABASE_USER;
    database_password = ENV.DATABASE_PASSWORD;
    database_name = ENV.DATABASE_NAME;
    database_ssl = ENV.DATABASE_SSL || {
            rejectUnauthorized: false
        };
}else{
    console.log("Using DATABASE_URL for DB config");
    database_host = dbUrl.hostname;
    database_port = dbUrl.port || 3306;
    database_user = dbUrl.username;
    database_password = dbUrl.password;
    database_name = dbUrl.pathname.replace("/", "");
    database_ssl = dbUrl.searchParams.get("ssl") === "true" 
      ? { rejectUnauthorized: false }
      : null;
}

console.log("Credentials - Host:", database_host, "Port:", database_port, "User:", database_user, "DB Name:", database_name, "Password:", database_password);

export const pool = mariadb.createPool({
  host: database_host,
  port: database_port || 3306,
  user: database_user,
  password: database_password,
  database: database_name,
  ssl: database_ssl,
  connectionLimit: 5,
  connectTimeout: 10000,
  acquireTimeout: 10000,
});