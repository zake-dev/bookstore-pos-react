import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    flexDirection: "row",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    paddingTop: theme.spacing(1) + 3,
    paddingBottom: theme.spacing(1) + 3,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    fontSize: "1.2rem",
    fontWeight: 600,
    backgroundColor: "#ffffff",
  },
  refreshButton: {
    backgroundColor: "#3F51B5",
    color: "#ffffff",

    "&:hover": {
      backgroundColor: "#354497",
    },
  },
  buttonIcon: {
    marginRight: 5,
  },
}));
