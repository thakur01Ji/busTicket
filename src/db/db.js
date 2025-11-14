import mariadb from "mariadb";
import { ENV } from "../config/env.js";

const dbUrl = new URL(ENV.DATABASE_URL);


export const pool = mariadb.createPool({
  host: dbUrl.hostname,
  port: dbUrl.port || 3306,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.replace("/", ""),
  ssl: dbUrl.searchParams.get("ssl") === "true" 
    ? { rejectUnauthorized: false }
    : null,
  connectionLimit: 5,
  connectTimeout: 10000,
  acquireTimeout: 10000,
});