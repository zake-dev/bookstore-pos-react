import Http from "./config";
import Book from "@interfaces/Book";

export const fetchBookFromApiEntity = async (isbn: string) => {
  const response = await Http.get("/v3/search/book", {
    params: { query: isbn, target: "isbn" },
  });
  const data = response.data.documents[0];

  if (!data) return;

  const book = {
    isbn,
    title: data.title,
    author: data.authors.join(", "),
    press: data.publisher,
    price: data.price,
  } as Book;
  return book;
};
