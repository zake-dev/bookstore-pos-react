import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  tableContainer: {
    flex: "1 1 auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tableFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "#cccccc",
  },
  emptyTableContent: {
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
  editSwitch: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  editSwitchLabel: {
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#333333",
  },
}));
