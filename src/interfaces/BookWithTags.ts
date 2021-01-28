type BookWithTags = {
  id: string;
  isbn: string;
  title: string;
  author: string;
  press: string;
  location: number;
  agegroup: string;
  price: number;
  quantity: number;
  currentQuantity: number;
  tags: string[];
};

export default BookWithTags;
