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

export const createTransactionEntities = async ({
  type,
  books,
  discountRate = 0,
}: {
  type: string;
  books: Book[];
  discountRate?: number;
}) => {
  const now = Date.now();
  const timestamp = new Date(now).toLocaleString("en-GB");
  await pool.query(
    `
    INSERT INTO gomgomi.transactions
    VALUES ('${now}', '${type}', '${timestamp}');
    `,
  );
  for (let book of books) {
    await pool.query(
      `
      INSERT INTO gomgomi.booktransactions
      VALUES ('${book.isbn}', '${now}', ${book.currentQuantity}, ${discountRate});
      `,
    );
  }
};
