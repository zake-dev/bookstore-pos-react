import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  select: {
    width: "6rem",
    marginRight: theme.spacing(2),
    backgroundColor: "#ffffff",

    "& .MuiSelect-select:focus": {
      backgroundColor: "white !important",
    },
  },
  datePickerInput: {
    width: "8rem",
    backgroundColor: "#ffffff",
    textAlign: "center",
  },
  iconButton: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1) + 3,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    backgroundColor: "#ffffff",
    fontSize: "1.2rem",
    fontWeight: 600,
  },
  icon: {
    fontSize: "1.8rem",
    fontWeight: 600,
    marginRight: theme.spacing(1),
  },
}));
