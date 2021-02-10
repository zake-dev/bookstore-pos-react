import Book from "@interfaces/Book";

type Transaction = {
  id: number;
  type: string;
  timestamp: string;
  vendors_id: number;
  vendor: string;
  book: Book;
  quantity: number;
};

export default Transaction;
