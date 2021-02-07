import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  board: {
    display: "flex",
    margin: theme.spacing(3),
  },
  bottomMenu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    height: "8rem",
    marginTop: theme.spacing(2),
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
}));
