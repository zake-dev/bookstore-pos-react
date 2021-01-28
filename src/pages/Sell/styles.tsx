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
    alignItems: "center",
    width: "100%",
    height: "10rem",
    marginTop: theme.spacing(1),
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
}));
