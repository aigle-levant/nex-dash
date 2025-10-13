import pkg from "pg";
import dotenv from "dotenv";
// before creating a pool, setup config
dotenv.config();
// create a postgres pool
const { Pool } = pkg;
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
})
