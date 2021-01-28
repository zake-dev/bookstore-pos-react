import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  board: {
    minWidth: "15vw",
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
