import Agegroup from "@interfaces/Agegroup";

import pool from "./dbAdmin";

export const getAllAgegroupEntities = async () => {
  const result = await pool.query(
    `
    SELECT * FROM gomgomi.agegroups
    ORDER BY id;
    `,
  );
  return result.rows as Agegroup[];
};
