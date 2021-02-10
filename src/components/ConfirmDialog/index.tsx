import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
} from "@material-ui/core";

import { useStyles } from "./styles";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  handleConfirm: any;
};

const ConfirmDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const {
    open,
    setOpen,
    title,
    description,
    confirmLabel,
    cancelLabel,
    handleConfirm,
  } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography className={classes.title}>{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography className={classes.description}>{description}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm}>
          <Typography className={classes.confirmLabel}>
            {confirmLabel}
          </Typography>
        </Button>
        <Button onClick={handleClose}>
          <Typography className={classes.cancelLabel}>{cancelLabel}</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
