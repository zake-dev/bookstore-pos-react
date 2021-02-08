import { Pool } from "pg";
import { DB_CONFIG } from "config";
import Tag from "@interfaces/Tag";
import { RestoreOutlined } from "@material-ui/icons";

const pool = new Pool({
  user: DB_CONFIG.USERNAME,
  host: DB_CONFIG.HOST,
  database: DB_CONFIG.NAME,
  password: DB_CONFIG.PASSWORD,
  port: DB_CONFIG.PORT,
});

export const getAllTagEntities = async () => {
  const result = await pool.query(
    `
    SELECT * FROM gomgomi.tags
    ORDER BY description COLLATE "C";
    `,
  );
  return result.rows as Tag[];
};

export const findTagEntity = async (description: string) => {
  const result = await pool.query(
    `
    SELECT * FROM gomgomi.tags
    WHERE description = '${description}';
    `,
  );
  return result.rows[0] as Tag;
};

export const addTagEntity = async (description: string) => {
  await pool.query(
    `
    INSERT INTO gomgomi.Tags (description)
    VALUES ('${description}');
    `,
  );
};

export const deleteTagEntity = async (tag: Tag) => {
  await pool.query(
    `
    DELETE FROM gomgomi.booktags
    WHERE tags_id = ${tag.id};

    DELETE FROM gomgomi.tags
    WHERE id = ${tag.id};
    `,
  );
};
