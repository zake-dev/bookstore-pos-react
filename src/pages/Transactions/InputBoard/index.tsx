import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {
  useTransactionsState,
  useTransactionsDispatch,
} from "@reducers/TransactionsStates";
import { DatePicker } from "@material-ui/pickers";

import { useStyles } from "./styles";

const dayToMillisecond = (day: number) => day * 24 * 60 * 60 * 1000;

const InputBoard = () => {
  const classes = useStyles();
  const dispatch = useTransactionsDispatch();
  const { list } = useTransactionsState();
  const [menu, setMenu] = React.useState("all");
  const [startDate, setStartDate] = React.useState(
    new Date(Date.now() - dayToMillisecond(1)),
  );
  const [endDate, setEndDate] = React.useState(new Date());

  const handleMenuChange = async (event: any) => {
    setMenu(event.target.value);
  };

  return (
    <div className={classes.row}>
      <FormControl variant="outlined">
        <InputLabel>분류</InputLabel>
        <Select
          className={classes.select}
          label="분류"
          value={menu}
          onChange={handleMenuChange}
        >
          <MenuItem value="all">전체</MenuItem>
          <MenuItem value="sell">판매</MenuItem>
          <MenuItem value="register">입고</MenuItem>
          <MenuItem value="return">반품</MenuItem>
        </Select>
      </FormControl>
      <DatePicker
        value={startDate}
        onChange={(date: any) => {
          setStartDate(date);
        }}
        allowKeyboardControl={false}
        disableFuture
        inputVariant="outlined"
        label="시작 날짜"
        format="yyyy/MM/DD dd"
        okLabel="선택하기"
        cancelLabel="취소"
        inputProps={{ className: classes.datePickerInput }}
        style={{ marginRight: 10 }}
      />
      <DatePicker
        value={endDate}
        onChange={(date: any) => {
          setEndDate(date);
        }}
        allowKeyboardControl={false}
        disableFuture
        inputVariant="outlined"
        label="마지막 날짜"
        format="yyyy/MM/DD dd"
        okLabel="선택하기"
        cancelLabel="취소"
        inputProps={{ className: classes.datePickerInput }}
        style={{ marginRight: 10 }}
      />
      <Button className={classes.iconButton} variant="contained">
        <SearchIcon className={classes.icon} />
        검색
      </Button>
    </div>
  );
};

export default InputBoard;
