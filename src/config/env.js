import "dotenv/config";

export const ENV = {
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV,
    DATABASE_URL : process.env.DATABASE_URL,
    DATABASE_HOST : process.env.DB_HOST,
    DATABASE_USER : process.env.DB_USER,
    DATABASE_PASSWORD : process.env.DB_PASSWORD,
    DATABASE_NAME : process.env.DB_NAME,
    DATABASE_PORT : process.env.DB_PORT,
    DATABASE_NUMBER : process.env.DB_NUMBER,
    JWT_SECRET : process.env.JWT_SECRET || "secretkey",
    SCHEMA_MIGRATION_FILE : process.env.SCHEMA_MIGRATION_FILE,

}