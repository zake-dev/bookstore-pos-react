import React from "react";
import { Chip, Dialog, Typography } from "@material-ui/core";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";

import placeholder from "@assets/images/book-placeholder.jpg";
import BookWithTags from "@interfaces/BookWithTags";
import { getBookWithTagsEntity } from "@db/bookDataAccess";
import { useStyles } from "./styles";

type Props = {
  isbn: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookDetailsDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [book, setBook] = React.useState({} as BookWithTags);
  const { isbn, open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setBook(await getBookWithTagsEntity(isbn));
    };
    fetchData();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <Typography className={classes.dialogTitle}>도서상세정보</Typography>
      <div className={classes.row}>
        <img src={placeholder} className={classes.placeholder} />
        <div className={classes.infoCard}>
          <Typography variant="h6" style={{ marginBottom: 5 }}>
            {book.title}
          </Typography>
          <Typography>
            <b>저자</b> {book.author}
          </Typography>
          <Typography>
            <b>출판사</b> {book.press}
          </Typography>
          <Typography>
            <b>ISBN</b> {book.isbn}
          </Typography>
          <Typography>
            <b>정가</b>
            {" \u20a9"}
            {new Intl.NumberFormat("ko-KR").format(book.price)}
          </Typography>
          <Typography>
            <b>재고</b> {book.quantity}권
          </Typography>
        </div>
      </div>
      <div className={classes.chipBox}>
        <Chip
          icon={<BookmarkOutlinedIcon />}
          label={"1번 서가"}
          color="secondary"
        />
        {book.tags.map((tag) => (
          <Chip icon={<BookmarkOutlinedIcon />} label={tag} />
        ))}
      </div>
    </Dialog>
  );
};

export default BookDetailsDialog;
