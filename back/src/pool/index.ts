import pg from "pg";
import { config } from "dotenv";

config();

const pool = new pg.Pool({
  user: process.env.USERPG,
  port: Number(process.env.PORTPG),
  host: process.env.HOSTPG,
  password: process.env.PGPASSW,
  database: process.env.PGDB,
  max: 10000,
  idleTimeoutMillis: 30000,
});

export default pool;
