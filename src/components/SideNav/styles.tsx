import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  button: {
    width: "13rem",
    justifyContent: "start",

    "& $buttonIcon, & $buttonText": {
      color: "#95A0DA",
    },
    "&:hover": {
      backgroundColor: "#3f51b5",
    },
    "&:hover $buttonIcon, &:hover $buttonText": {
      color: "#ffffff",
    },
  },
  buttonActive: {
    "& $buttonIcon, & $buttonText": {
      color: "#ffffff !important",
    },
  },
  buttonIcon: {
    color: "inherit",
    transform: "scale(1.5)",
  },
  buttonText: {
    fontSize: "1.2rem",
    fontWeight: 700,
  },
  divider: {
    background: "#ffffff !important",
    width: "0.2rem",
  },
  drawer: {
    backgroundColor: "#3f51b5",
  },
  drawerOpen: {
    width: "13rem",
    overflowX: "hidden",
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
