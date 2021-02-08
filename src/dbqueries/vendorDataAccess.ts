import { Pool } from "pg";
import { DB_CONFIG } from "config";
import Vendor from "@interfaces/Vendor";

const pool = new Pool({
  user: DB_CONFIG.USERNAME,
  host: DB_CONFIG.HOST,
  database: DB_CONFIG.NAME,
  password: DB_CONFIG.PASSWORD,
  port: DB_CONFIG.PORT,
});

export const getAllVendorsEntity = async () => {
  const result = await pool.query(
    `
    SELECT * FROM gomgomi.vendors
    ORDER BY name;
    `,
  );
  return result.rows as Vendor[];
};
