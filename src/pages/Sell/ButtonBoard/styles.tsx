import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  board: {
    display: "flex",
    margin: theme.spacing(3),
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    marginLeft: theme.spacing(2),
    paddingTop: theme.spacing(1) + 3,
    paddingBottom: theme.spacing(1) + 3,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    fontSize: "1.2rem",
    fontWeight: 600,
  },
  sellButton: {
    backgroundColor: "#3F51B5",
    color: "#ffffff",

    "&:hover": {
      backgroundColor: "#354497",
    },
  },
  buttonIcon: {
    marginRight: 5,
  },
  sellButtonIcon: {
    fontSize: "3.5rem",
  },
}));
