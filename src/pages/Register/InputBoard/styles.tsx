import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  textfield: {
    width: "25rem",
    marginTop: theme.spacing(2),
    backgroundColor: "#ffffff",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "25rem",
  },
  column: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontSize: "1.2rem",
  },
  iconButton: {
    padding: "0.2rem",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    width: "12rem",
    height: "3.5rem",
    fontSize: "1.2rem",
    fontWeight: 600,
    backgroundColor: "#ffffff",
  },
  buttonIcon: {
    marginRight: 5,
  },
}));
