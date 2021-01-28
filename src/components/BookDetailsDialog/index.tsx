import React from "react";
import { Dialog } from "@material-ui/core";

import { useStyles } from "./styles";

type Props = {
  isbn: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookDetailsDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { isbn, open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      도서정보
    </Dialog>
  );
};

export default BookDetailsDialog;
