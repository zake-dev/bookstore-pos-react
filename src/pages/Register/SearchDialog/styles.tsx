import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  dialog: {
    width: "80vw",
    padding: theme.spacing(3),
  },
  bottomMenu: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
}));
