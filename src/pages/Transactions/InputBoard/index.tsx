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
import Toast, { severityType } from "@components/Toast";

import { useStyles } from "./styles";
import Transactions from "..";
import { getAllTransactionEntities } from "@db/transactionDataAccess";

const dayToMillisecond = (day: number) => day * 24 * 60 * 60 * 1000;

const InputBoard = () => {
  const classes = useStyles();
  const dispatch = useTransactionsDispatch();
  const { list } = useTransactionsState();
  const [menu, setMenu] = React.useState("all");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [toastOpen, setToastOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("success" as severityType);
  const [message, setMessage] = React.useState("");

  const handleMenuChange = (event: any) => {
    setMenu(event.target.value);
  };

  const handleSearch = async () => {
    // Error handling - 올바르지 않은 기간 범위
    if (startDate.getTime() > endDate.getTime()) {
      setToastOpen(false);
      setSeverity("error");
      setMessage(
        "잘못된 범위입니다. 마지막 날짜보다 시작 날짜를 빠르게 설정해주세요.",
      );
      setToastOpen(true);
      return;
    }

    // fix time parts of date range
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setSeconds(59);
    endDate.setMilliseconds(999);

    // filtering list
    const min = startDate.getTime();
    const max = endDate.getTime();
    let filtered = await getAllTransactionEntities({ start: min, end: max });
    if (menu !== "all")
      filtered = filtered.filter((transaction) => transaction.type === menu);

    dispatch({ type: "SET_LIST", list: filtered });

    setToastOpen(false);
    setSeverity("success");
    setMessage(`총 ${filtered.length}건의 기록이 검색되었습니다.`);
    setToastOpen(true);
  };

  return (
    <>
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
            setStartDate(new Date(date));
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
            setEndDate(new Date(date));
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
        <Button
          className={classes.iconButton}
          variant="contained"
          onClick={handleSearch}
        >
          <SearchIcon className={classes.icon} />
          검색
        </Button>
      </div>
      <Toast
        open={toastOpen}
        setOpen={setToastOpen}
        severity={severity}
        message={message}
      />
    </>
  );
};

export default InputBoard;
