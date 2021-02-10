import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  select: {
    width: "14.5rem",
    margin: 0,
    backgroundColor: "#ffffff",

    "& .MuiSelect-select:focus": {
      backgroundColor: "white !important",
    },
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: 600,
  },
  addLabel: {
    color: "#3f51b5",
    fontWeight: 600,
  },
  editTagLabel: {
    color: "#DB808A",
    fontWeight: 600,
  },
  cancelLabel: {
    fontWeight: 600,
  },
  helperText: {
    color: "#aaaaaa",
  },
}));
