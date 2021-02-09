import Book from "@interfaces/Book";
import Tag from "@interfaces/Tag";

import pool from "./dbAdmin";

export const getAllTagEntities = async () => {
  const result = await pool.query(
    `
    SELECT * FROM gomgomi.tags
    ORDER BY description COLLATE "C";
    `,
  );
  return result.rows as Tag[];
};

export const getTagEntity = async (id: number) => {
  const result = await pool.query(
    `
    SELECT * FROM gomgomi.tags
    WHERE id = ${id};
    `,
  );
  return result.rows[0] as Tag;
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

export const findAllTagEntities = async (isbn: string) => {
  const result = await pool.query(
    `
    SELECT * 
    FROM gomgomi.tags t INNER JOIN gomgomi.booktags bt
      ON t.id = bt.tags_id
    WHERE bt.books_id = '${isbn}'
    ORDER BY description COLLATE "C";
    `,
  );
  return result.rows as Tag[];
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

export const addBookTagEntity = async (book: Book, tag: Tag) => {
  await pool.query(
    `
    INSERT INTO gomgomi.booktags
    VALUES ('${book.isbn}', ${tag.id});
    `,
  );
};

export const deleteBookTagEntities = async (book: Book) => {
  await pool.query(
    `
    DELETE FROM gomgomi.booktags
    WHERE books_id = '${book.isbn}';
    `,
  );
};
