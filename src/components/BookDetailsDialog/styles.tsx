import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  board: {
    padding: theme.spacing(3),
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  dialogTitle: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    backgroundColor: "#3f51b5",
    color: "#ffffff",
    fontSize: "1.3rem",
    fontWeight: 700,
  },
  infoCard: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  placeholder: {
    width: "15rem",
  },
  chipBox: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: theme.spacing(2),

    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));
