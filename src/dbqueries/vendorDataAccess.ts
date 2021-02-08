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

export const getAllVendorEntities = async () => {
  const result = await pool.query(
    `
    SELECT * FROM gomgomi.vendors
    ORDER BY name COLLATE "C";
    `,
  );
  return result.rows as Vendor[];
};

export const findVendorEntity = async (name: string) => {
  const result = await pool.query(
    `
    SELECT * FROM gomgomi.vendors
    WHERE name = '${name}';
    `,
  );
  return result.rows[0] as Vendor;
};

export const addVendorEntity = async (name: string) => {
  await pool.query(
    `
    INSERT INTO gomgomi.vendors (name)
    VALUES ('${name}');
    `,
  );
};

export const deleteVendorEntity = async (vendor: Vendor) => {
  await pool.query(
    `
    UPDATE gomgomi.transactions
    SET vendors_id = NULL
    WHERE vendors_id = ${vendor.id};

    DELETE FROM gomgomi.vendors
    WHERE id = ${vendor.id};
    `,
  );
};
