import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  tableContainer: {
    flex: "1 1 auto",
    width: "100%",
  },
  emptyTableContent: {
    height: "85%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTableContentText: {
    fontSize: "2.2rem",
    fontWeight: 700,
    color: "#dddddd",
  },
  bodyRow: {
    height: "3.5rem !important",
  },
  headerCell: {
    backgroundColor: "#CCCCCC",
    fontSize: "1.2rem",
    fontWeight: "bold",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  bodyCell: {
    fontSize: "1.2rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  indexCell: {
    fontSize: "1.2rem",
    fontWeight: 700,
    textAlign: "center",
  },
  quantityCell: {
    fontSize: "1.2rem",
    fontWeight: 700,
    textAlign: "center",
  },
  iconButton: {
    padding: theme.spacing(1),
  },
}));
