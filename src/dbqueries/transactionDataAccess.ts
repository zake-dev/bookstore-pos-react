import Book from "@interfaces/Book";
import Vendor from "@interfaces/Vendor";

import pool from "./dbAdmin";

export const createTransactionEntities = async ({
  type,
  books,
  vendor,
}: {
  type: string;
  books: Book[];
  vendor?: Vendor;
}) => {
  const now = Date.now();
  const timestamp = new Date(now).toLocaleString("en-GB");
  await pool.query(
    `
    INSERT INTO gomgomi.transactions
    VALUES ('${now}', '${type}', '${timestamp}'${vendor && ", " + vendor.id});
    `,
  );
  for (let book of books) {
    await pool.query(
      `
      INSERT INTO gomgomi.booktransactions
      VALUES ('${book.isbn}', '${now}', ${book.currentQuantity});
      `,
    );
  }
};
