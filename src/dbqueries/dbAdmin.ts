import { Pool } from "pg";
import { DB_CONFIG } from "config";

const pool = new Pool({
  user: DB_CONFIG.USERNAME,
  host: DB_CONFIG.HOST,
  database: DB_CONFIG.NAME,
  password: DB_CONFIG.PASSWORD,
  port: DB_CONFIG.PORT,
});

const alterBooksTableQuery = `
CREATE TABLE gomgomi.books AS
  SELECT isbn, title, author, press, location, agegroups_id, price, sum(quantity) as quantity
  FROM gomgomi.bookstemp
  GROUP BY isbn, title, author, press, location, agegroups_id, price;
`;

const deleteDuplicateBooksQuery = `
DELETE FROM gomgomi.books a
      USING gomgomi.books b
WHERE a.isbn = b.isbn
  AND a.quantity < b.quantity;
`;

export default pool;
