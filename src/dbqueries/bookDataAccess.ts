import { Pool } from "pg";
import { DB_CONFIG } from "config";
import Book from "@interfaces/Book";

const pool = new Pool({
  user: DB_CONFIG.USERNAME,
  host: DB_CONFIG.HOST,
  database: DB_CONFIG.NAME,
  password: DB_CONFIG.PASSWORD,
  port: DB_CONFIG.PORT,
});

export const getBookEntity = async (isbn: string) => {
  const result = await pool.query(
    `
    SELECT isbn, title, author, press, location, agegroups_id, 
           name as agegroup, price, quantity
    FROM gomgomi.books b INNER JOIN gomgomi.agegroups a
        ON b.agegroups_id = a.id
    WHERE isbn = '${isbn}';
    `,
  );
  return result.rows[0];
};

export const getBookWithTagsEntity = async (isbn: string) => {
  const result = await pool.query(
    `
    SELECT isbn, title, author, press, location, a.name as agegroup,
       price, quantity,
       array(SELECT description
             FROM gomgomi.booktags bt INNER JOIN gomgomi.tags t
             ON bt.tags_id = t.id
             WHERE bt.books_id = '${isbn}') AS tags
    FROM gomgomi.books b INNER JOIN gomgomi.agegroups a
      ON b.agegroups_id = a.id
    WHERE isbn = '${isbn}';
    `,
  );
  return result.rows[0];
};

export const getAllBookEntities = async () => {
  const result = await pool.query(
    `
    SELECT isbn, title, author, press, location, agegroups_id, 
           name as agegroup, price, quantity
    FROM gomgomi.books b INNER JOIN gomgomi.agegroups a
        ON b.agegroups_id = a.id
    ORDER BY title COLLATE "C";
    `,
  );
  return result.rows;
};

export const filterAllBookEntities = async ({
  column,
  keyword,
}: {
  column: string;
  keyword: string;
}) => {
  let result;
  switch (column) {
    case "location":
      result = await pool.query(
        `
        SELECT isbn, title, author, press, location, agegroups_id, 
           name as agegroup, price, quantity
        FROM gomgomi.books b INNER JOIN gomgomi.agegroups a
          ON b.agegroups_id = a.id
        WHERE location = ${keyword}
        ORDER BY title COLLATE "C";
        `,
      );
      return result.rows;
    case "agegroup":
      result = await pool.query(
        `
        SELECT isbn, title, author, press, location, agegroups_id, 
           name as agegroup, price, quantity
        FROM gomgomi.books b INNER JOIN gomgomi.agegroups a
          ON b.agegroups_id = a.id
        WHERE REPLACE(name, ' ', '') LIKE '%${keyword}%'
        ORDER BY title COLLATE "C";
        `,
      );
      return result.rows;
    case "tag":
      result = await pool.query(
        `
        SELECT isbn, title, author, press, location, agegroups_id, 
           name as agegroup, price, quantity
        FROM gomgomi.books b INNER JOIN gomgomi.agegroups a
          ON b.agegroups_id = a.id
        WHERE isbn IN (SELECT bt.books_id as isbn
                FROM gomgomi.booktags bt INNER JOIN gomgomi.tags t
                  ON bt.tags_id = t.id
                WHERE REPLACE(description, ' ', '') LIKE '%${keyword}%')
        ORDER BY title COLLATE "C";
        `,
      );
      return result.rows;
    default:
      result = await pool.query(
        `
        SELECT isbn, title, author, press, location, agegroups_id, 
           name as agegroup, price, quantity
        FROM gomgomi.books b INNER JOIN gomgomi.agegroups a
          ON b.agegroups_id = a.id
        WHERE REPLACE(${column}, ' ', '') LIKE '%${keyword}%'
        ORDER BY title COLLATE "C";
        `,
      );
      return result.rows;
  }
};

export const deleteBookEntity = async (isbn: string) => {
  await pool.query(
    `
    DELETE FROM gomgomi.booktags
    WHERE books_id = '${isbn}';

    DELETE FROM gomgomi.booktransactions
    WHERE books_id = '${isbn}';

    DELETE FROM gomgomi.books
    WHERE isbn = '${isbn}';
    `,
  );
};

export const addBookEntity = async (book: Book) => {
  await pool.query(
    `
    INSERT INTO gomgomi.books
    VALUES ('${book.isbn}', '${book.title}', '${book.author}', '${book.press}', 
            ${book.location}, ${book.agegroups_id}, ${book.price}, ${book.quantity});
    `,
  );
};

export const updateBookEntity = async (book: Book) => {
  await pool.query(
    `
    UPDATE gomgomi.books
    SET title = '${book.title}',
        author = '${book.author}',
        press = '${book.press}',
        location = ${book.location},
        agegroups_id = ${book.agegroups_id},
        price = ${book.price},
        quantity = ${book.quantity}
    WHERE isbn = '${book.isbn}';
    `,
  );
};
