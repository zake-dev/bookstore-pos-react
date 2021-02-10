import Book from "@interfaces/Book";
import Vendor from "@interfaces/Vendor";
import Transaction from "@interfaces/Transaction";

import pool from "./dbAdmin";
import { getBookEntity } from "./bookDataAccess";

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
  await pool.query(
    `
    INSERT INTO gomgomi.transactions (id, type, vendors_id)
    VALUES (${now}, '${type}', ${vendor ? vendor.id : "NULL"});
    `,
  );
  for (let book of books) {
    await pool.query(
      `
      INSERT INTO gomgomi.booktransactions (books_id, transactions_id, quantity)
      VALUES ('${book.isbn}', ${now}, ${book.currentQuantity});
      `,
    );
  }
};

export const getAllTransactionEntities = async ({
  start = 0,
  end = Date.now(),
}: {
  start?: number;
  end?: number;
}) => {
  let transactionEntities = [];
  const transactions = (
    await pool.query(
      `
    SELECT t.id, type, vendors_id, v.name as vendor
    FROM gomgomi.transactions t LEFT JOIN gomgomi.vendors v
      ON t.vendors_id = v.id
    WHERE t.id >= ${start} AND t.id <= ${end}
    ORDER BY t.id DESC;
    `,
    )
  ).rows;

  for (let transaction of transactions) {
    const result = await pool.query(
      `
      SELECT books_id, quantity 
      FROM gomgomi.booktransactions
      WHERE transactions_id = ${transaction.id};
      `,
    );

    for (let row of result.rows) {
      const book = await getBookEntity(row.books_id);
      transactionEntities.push({
        ...transaction,
        id: Number(transaction.id),
        book,
        quantity: row.quantity,
      });
    }
  }

  return transactionEntities as Transaction[];
};

export const deleteTransactionEntity = async (transaction: Transaction) => {
  await pool.query(
    `
    DELETE FROM gomgomi.booktransactions
    WHERE books_id = '${transaction.book.isbn}'
      AND transactions_id = ${transaction.id};
    `,
  );

  const result = await pool.query(
    `
    SELECT * FROM gomgomi.booktransactions
    WHERE transactions_id = ${transaction.id};
    `,
  );
  if (!result.rows.length) {
    await pool.query(
      `
      DELETE FROM gomgomi.transactions
      WHERE id = ${transaction.id};
      `,
    );
  }
};
