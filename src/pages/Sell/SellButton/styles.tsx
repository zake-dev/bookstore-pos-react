import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(1) + 3,
    paddingBottom: theme.spacing(1) + 3,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    fontSize: "1.2rem",
    fontWeight: 600,
    backgroundColor: "#ffffff",
  },
  sellButton: {
    paddingTop: theme.spacing(2) + 3,
    paddingBottom: theme.spacing(2) + 3,
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
