import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  dialog: {
    maxWidth: "30rem",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  dialogTitle: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    backgroundColor: "#3f51b5",
    color: "#ffffff",
    fontSize: "1.3rem",
    fontWeight: 700,
  },
  infoCard: {
    display: "flex",
    flexDirection: "column",
    marginRight: theme.spacing(3),
  },
  placeholder: {
    marginTop: theme.spacing(1),
    width: "15rem",
  },
  chipBox: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),

    "& > *": {
      margin: theme.spacing(0.7),
    },
  },
  locationChip: {
    backgroundColor: "#DB808A",
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: 600,
  },
  agegroupChip: {
    backgroundColor: "#8ACB88",
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: 600,
  },
  tagChip: {
    color: "#444444",
    fontSize: "1rem",
    fontWeight: 500,
  },
  whiteIcon: {
    color: "#ffffff",
  },
}));
