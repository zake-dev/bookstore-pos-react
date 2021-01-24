import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  button: {
    width: "13rem",
    justifyContent: "start",
  },
  buttonIcon: {
    color: "#ffffff",
    transform: "scale(1.5)",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: "1.2rem",
  },
  drawer: {
    backgroundColor: "#3f51b5",
  },
  drawerOpen: {
    width: "13rem",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    width: theme.spacing(7) + 2,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));
