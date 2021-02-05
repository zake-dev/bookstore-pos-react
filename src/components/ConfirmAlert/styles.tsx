import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "1.4rem",
    fontWeight: 600,
  },
  confirmLabel: {
    color: "#3f15b5",
    fontWeight: 600,
  },
  cancelLabel: {
    fontWeight: 600,
  },
  description: {
    whiteSpace: "pre-line",
  },
}));
