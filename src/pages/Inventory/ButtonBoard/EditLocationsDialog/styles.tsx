import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "1.4rem",
    fontWeight: 600,
  },
  dialogBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  confirmLabel: {
    color: "#3f51b5",
    fontWeight: 600,
  },
  cancelLabel: {
    fontWeight: 600,
  },
  description: {
    whiteSpace: "pre-line",
  },
  locationTextField: {
    marginTop: theme.spacing(2),
    width: "7.5rem",
  },
  locationInput: {
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: 600,
  },
}));
