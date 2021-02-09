import Book from "@interfaces/Book";

type TransactionDetails = {
  book: Book;
  quantity: number;
  discountRate: number;
};

type Transaction = {
  id: string;
  type: string;
  timestamp: string;
  vendors_id: number;
  vendor: string;
  transactionDetails: TransactionDetails[];
};

export default Transaction;
