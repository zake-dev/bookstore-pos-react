import React from "react";
import { IconButton, Snackbar, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";

import { useStyles } from "./styles";

export type severityType = "success" | "info" | "warning" | "error" | undefined;

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  severity: severityType;
  message: string;
};

const Toast: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { open, setOpen, severity, message } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={(event: any, reason: string) => {
        if (reason === "clickaway") return;
        setOpen(false);
      }}
    >
      <Alert
        severity={severity}
        action={
          <IconButton
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <Typography className={classes.alertMessage}>{message}</Typography>
      </Alert>
    </Snackbar>
  );
};

export default Toast;
