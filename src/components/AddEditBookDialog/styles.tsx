import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "1.4rem",
    fontWeight: 600,
  },
  actionLabel: {
    color: "#3f51b5",
    fontWeight: 600,
  },
  cancelLabel: {
    fontWeight: 600,
  },
  iconButton: {
    padding: "0.2rem",
  },
  content: {
    padding: theme.spacing(3),
    paddingTop: 0,
    paddingBottom: 0,
    display: "flex",
    flexDirection: "column",
  },
  bigTextfield: {
    width: "30rem !important",
  },
  textfield: {
    flex: "1 1 auto",
    margin: theme.spacing(1),
    width: "14.5rem",

    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
  textfieldInput: {
    marginLeft: theme.spacing(1),
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  tagBox: {
    border: "1px solid #bbbbbb",
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    height: "10rem",
    width: "30rem",
    overflow: "auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tagChip: {
    margin: theme.spacing(1),
    color: "#444444",
    fontSize: "1rem",
    fontWeight: 500,
  },
  tagLabel: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  agegroupsMenu: {
    width: "14.5rem",
    margin: theme.spacing(1),
    backgroundColor: "#ffffff",

    "& .MuiSelect-select:focus": {
      backgroundColor: "white !important",
    },
  },
}));
