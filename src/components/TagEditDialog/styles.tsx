import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  tagBox: {
    border: "1px solid",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    marginTop: 0,
    marginBottom: 0,
    maxHeight: "25rem",
    overflow: "auto",
  },
  tagList: {
    maxHeight: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  tagChip: {
    margin: theme.spacing(1),
    color: "#444444",
    fontSize: "1rem",
    fontWeight: 500,
  },
  tagLabel: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
  textfield: {
    margin: theme.spacing(2),
  },
  title: {
    fontSize: "1.4rem",
    fontWeight: 600,
  },
  iconButton: {
    padding: "0.2rem",
  },
}));
