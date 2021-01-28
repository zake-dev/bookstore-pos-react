import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100vh",
    width: `calc(100% - ${theme.spacing(7) + 2}px)`,
    padding: theme.spacing(3),
    marginLeft: theme.spacing(7) + 2,
    backgroundColor: "#f9f9f9",
  },
}));
