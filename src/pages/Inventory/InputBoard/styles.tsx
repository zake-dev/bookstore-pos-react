import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  select: {
    width: "10rem",
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
  input: {
    fontSize: "1.2rem",
  },
  iconButton: {
    padding: "0.2rem",
  },
}));
