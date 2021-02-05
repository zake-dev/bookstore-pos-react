import React from "react";
import { Button, TextField, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";

import { useGlobalDispatch, useGlobalState } from "@reducers/GlobalStates";
import { getBookEntity } from "@db/bookDataAccess";

import { useStyles } from "./styles";

const InputBoard = () => {
  const classes = useStyles();
  const state = useGlobalState();
  const dispatch = useGlobalDispatch();
  const [isbn, setIsbn] = React.useState("");

  const handleSubmit = async () => {
    // Input Error - 문자 입력
    if (isNaN(parseInt(isbn))) return;
    // Input Error - ISBN 길이 오류
    if (isbn.length != 13) return;

    let book = await getBookEntity(isbn);
    // DB Error - 수량부족
    if (book.quantity == 0) return;

    // 이미 리스트에 존재하는지 탐색
    let existingIndex = -1;
    state.sellList.forEach((book, index) => {
      if (book.isbn === isbn) {
        existingIndex = index;
        return;
      }
    });
    // 리스트에 중복도서가 존재하는 경우
    if (existingIndex !== -1) {
      let qty = Math.min(
        state.sellList[existingIndex].currentQuantity + 1,
        book.quantity,
      );
      dispatch({
        type: "UPDATE_QTY_FROM_SELL",
        index: existingIndex,
        qty: qty,
      });
      return;
    }
    // 신규도서 추가
    dispatch({ type: "ADD_BOOK_TO_SELL", book: book });
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
    <div className={classes.column}>
      <div className={classes.row}>
        <Button className={classes.button} variant="contained">
          <SearchIcon className={classes.buttonIcon} />
          도서검색
        </Button>
        <Button className={classes.button} variant="contained">
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
  );
};

export default InputBoard;
