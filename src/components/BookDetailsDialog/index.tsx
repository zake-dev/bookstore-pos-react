import React from "react";
import { Chip, Dialog, Typography } from "@material-ui/core";
import RoomIcon from "@material-ui/icons/Room";
import FaceIcon from "@material-ui/icons/Face";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

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
  const [loading, setLoading] = React.useState(true);
  const { isbn, open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const book = await getBookWithTagsEntity(isbn);
      setBook(book);
      setLoading(false);
    };
    fetchData();
  }, [open]);

  if (loading) return null;

  return (
    <Dialog open={open} onClose={handleClose}>
      <Typography className={classes.dialogTitle}>도서상세정보</Typography>
      <div className={classes.row}>
        <img src={placeholder} className={classes.placeholder} />
        <div className={classes.infoCard}>
          <Typography variant="h6" style={{ marginBottom: 5, fontWeight: 600 }}>
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
          className={classes.locationChip}
          icon={<RoomIcon className={classes.whiteIcon} />}
          label={`${book.location}번 서가`}
        />
        <Chip
          className={classes.agegroupChip}
          icon={<FaceIcon className={classes.whiteIcon} />}
          label={book.agegroup}
        />
        {book.tags.map((tag) => (
          <Chip
            className={classes.tagChip}
            icon={<LocalOfferIcon />}
            label={tag}
          />
        ))}
      </div>
    </Dialog>
  );
};

export default BookDetailsDialog;
