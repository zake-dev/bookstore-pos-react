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
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    fontSize: "1.2rem",
    fontWeight: 600,
    backgroundColor: "#ffffff",
  },
  returnButton: {
    backgroundColor: "#3F51B5",
    color: "#ffffff",

    "&:hover": {
      backgroundColor: "#354497",
    },
  },
  buttonIcon: {
    marginRight: 5,
  },
  returnButtonIcon: {
    fontSize: "3.5rem",
  },
}));
