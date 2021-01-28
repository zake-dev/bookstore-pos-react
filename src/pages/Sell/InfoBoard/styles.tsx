import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  board: {
    height: "100%",
    minWidth: "15vw",
    backgroundColor: "#ffffff",
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
  divider: {
    margin: theme.spacing(1) + 3,
  },
  discountField: {
    position: "relative",
    top: -5,
    width: "3rem",
    margin: 0,
    padding: 0,
  },
  discountInput: {
    textAlign: "right",
  },
  totalText: {
    fontSize: "1.4rem",
    fontWeight: 600,
  },
}));
