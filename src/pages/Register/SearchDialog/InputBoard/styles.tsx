import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  select: {
    width: "11rem",
    height: "4rem",
    fontSize: "1.2rem",
    backgroundColor: "#ffffff",

    "& .MuiSelect-select:focus": {
      backgroundColor: "white !important",
    },
  },
  textfield: {
    width: "25rem",

    marginLeft: theme.spacing(1),
    backgroundColor: "#ffffff",
  },
  bodyFont: {
    height: "4rem",
    fontSize: "1.2rem",
  },
  iconButton: {
    padding: "0.2rem",
  },
}));
