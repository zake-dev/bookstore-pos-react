import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  column: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: "1.1rem",
  },
  select: {
    width: "11.5rem",
    height: "3.5rem",
    marginRight: theme.spacing(2),
    fontSize: "1.1rem",
    backgroundColor: "#ffffff",

    "& .MuiSelect-select:focus": {
      backgroundColor: "white !important",
    },
  },
  button: {
    display: "flex",
    flexDirection: "column",
    width: "11.5rem",
    height: "3.5rem",
    marginRight: theme.spacing(2),
    fontSize: "1.2rem",
    fontWeight: 600,
    backgroundColor: "#ffffff",
  },
  buttonIcon: {
    marginRight: 5,
  },
}));
