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
