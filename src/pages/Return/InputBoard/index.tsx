import React from "react";
import { Button, TextField, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";

import { useGlobalDispatch, useGlobalState } from "@reducers/GlobalStates";
import { InventoryStateProvider } from "@reducers/InventoryStates";
import { getBookEntity } from "@db/bookDataAccess";
import Toast from "@components/Toast";

import SearchDialog from "../SearchDialog";
import { useStyles } from "./styles";

const InputBoard = () => {
  const classes = useStyles();
  const { returnList: list } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const [isbn, setIsbn] = React.useState("");
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClearList = () => {
    dispatch({ type: "REFRESH_RETURN_WITH", list: [] });
  };

  const handleSubmit = async () => {
    if (!isbn) return;

    // Input Error - 문자 입력
    if (isNaN(parseInt(isbn))) {
      setToastOpen(false);
      setMessage("숫자만 입력해주세요.");
      setToastOpen(true);
      return;
    }
    // Input Error - ISBN 길이 오류
    if (isbn.length != 13) {
      setToastOpen(false);
      setMessage("유효하지 않은 ISBN입니다. (13자리 숫자)");
      setToastOpen(true);
      return;
    }

    let book = await getBookEntity(isbn);
    // DB Error - 등록되지 않은 도서
    if (!book) {
      setToastOpen(false);
      setMessage("등록되지 않은 도서입니다. 먼저 입고해주세요.");
      setToastOpen(true);
      return;
    }
    // DB Error - 수량부족
    if (book.quantity == 0) {
      setToastOpen(false);
      setMessage("수량이 부족한 도서입니다. 먼저 입고해주세요.");
      setToastOpen(true);
      return;
    }

    // 이미 리스트에 존재하는지 탐색
    let existingIndex = -1;
    list.forEach((book, index) => {
      if (book.isbn === isbn) {
        existingIndex = index;
        return;
      }
    });
    // 리스트에 중복도서가 존재하는 경우
    if (existingIndex !== -1) {
      let qty = Math.min(
        list[existingIndex].currentQuantity + 1,
        book.quantity,
      );
      dispatch({
        type: "UPDATE_QTY_FROM_RETURN",
        index: existingIndex,
        qty: qty,
      });
      return;
    }
    // 신규도서 추가
    dispatch({ type: "ADD_BOOK_TO_RETURN", book: book });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIsbn(e.target.value);

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
      setIsbn("");
    }
  };

  return (
    <>
      <div className={classes.column}>
        <div className={classes.row}>
          <Button
            className={classes.button}
            variant="contained"
            onClick={() => {
              setSearchOpen(true);
            }}
          >
            <SearchIcon className={classes.buttonIcon} />
            도서검색
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            onClick={handleClearList}
          >
            <DeleteIcon className={classes.buttonIcon} />
            전체삭제
          </Button>
        </div>
        <TextField
          className={classes.textfield}
          variant="outlined"
          label="ISBN/바코드"
          placeholder="바코드를 입력해주세요..."
          value={isbn}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          autoFocus
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => {
                  handleSubmit();
                  setIsbn("");
                }}
                className={classes.iconButton}
              >
                <SearchIcon />
              </IconButton>
            ),
            className: classes.input,
          }}
        />
      </div>
      {searchOpen && (
        <InventoryStateProvider>
          <SearchDialog open={searchOpen} setOpen={setSearchOpen} />
        </InventoryStateProvider>
      )}
      <Toast
        open={toastOpen}
        setOpen={setToastOpen}
        severity="error"
        message={message}
      />
    </>
  );
};

export default InputBoard;
