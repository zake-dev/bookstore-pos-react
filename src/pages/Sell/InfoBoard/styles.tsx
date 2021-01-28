import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  board: {
    width: "15vw",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(1),
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
}));
