import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import RoomIcon from "@material-ui/icons/Room";
import {
  useInventoryDispatch,
  useInventoryState,
} from "@reducers/InventoryStates";
import { updateBookEntity } from "@db/bookDataAccess";
import Toast from "@components/Toast";

import { useStyles } from "./styles";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const EditLocationsDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useInventoryDispatch();
  const { list, selected } = useInventoryState();
  const { open, setOpen } = props;
  const [location, setLocation] = React.useState(1);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleConfirm = async () => {
    for (let book of list) {
      if (selected.includes(book.isbn)) {
        book.location = location;
        await updateBookEntity(book);
      }
    }
    dispatch({ type: "SET_LIST", list: list });
    setOpen(false);
    setLocation(1);
    setMessage(`도서 ${selected.length}권의 서가 위치를 모두 변경했습니다.`);
    setToastOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: any) => {
    let value: number = parseInt(event.target.value);
    if (isNaN(value)) return;
    setLocation(value);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>
          <Typography className={classes.title}>서가일괄변경</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogBody}>
            <Typography
              className={classes.description}
            >{`선택한 도서 ${selected.length}권에 대한 새로운 서가 번호를 입력해주세요. `}</Typography>
            <TextField
              className={classes.locationTextField}
              variant="outlined"
              type="number"
              size="small"
              label="서가위치"
              value={location}
              onChange={handleChange}
              inputProps={{ min: 1, className: classes.locationInput }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RoomIcon />
                  </InputAdornment>
                ),
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>
            <Typography className={classes.confirmLabel}>변경하기</Typography>
          </Button>
          <Button onClick={handleClose}>
            <Typography className={classes.cancelLabel}>취소</Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <Toast
        open={toastOpen}
        setOpen={setToastOpen}
        severity="success"
        message={message}
      />
    </>
  );
};

export default EditLocationsDialog;
