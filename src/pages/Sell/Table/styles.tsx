import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  tableContainer: {
    flex: "1 1 auto",
  },
  emptyTableContent: {
    height: "90%",
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
}));
