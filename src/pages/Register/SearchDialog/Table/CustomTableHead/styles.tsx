import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  headerCell: {
    backgroundColor: "#CCCCCC",
    fontSize: "1.2rem",
    fontWeight: "bold",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  checkbox: {
    padding: 0,
    "&.Mui-checked": {
      color: "#3f51b5",
    },
    "&:hover": {
      backgroundColor: "#bbbbbb",
    },
  },
}));
