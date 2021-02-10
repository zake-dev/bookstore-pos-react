import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { filterAllBookEntities } from "@db/bookDataAccess";
import { useInventoryDispatch } from "@reducers/InventoryStates";

import { useStyles } from "./Styles";

const InputBoard = () => {
  const classes = useStyles();
  const dispatch = useInventoryDispatch();
  const [column, setColumn] = React.useState("title");
  const [keyword, setKeyword] = React.useState("");

  const handleMenuChange = (event: any) => {
    setColumn(event.target.value);
  };

  const handleTextFieldChange = (event: any) => {
    setKeyword(event.target.value);
  };

  const handleSearchClick = () => {
    // Input Error - 빈 키워드 검색
    if (!keyword) return;

    handleSubmit();
  };

  const handleKeyPress = (event: any) => {
    // Input Error - 빈 키워드 검색
    if (!keyword) return;

    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const books = await filterAllBookEntities({
      column: column,
      keyword: keyword.replace(" ", ""),
    });
    dispatch({ type: "SET_LIST", list: books });
    dispatch({ type: "SET_PAGE", page: 0 });
    dispatch({ type: "SET_SELECTED", selected: [] });
  };

  return (
    <div>
      <FormControl variant="outlined">
        <InputLabel>검색조건</InputLabel>
        <Select
          className={classes.select}
          label="검색조건"
          value={column}
          onChange={handleMenuChange}
        >
          <MenuItem value="title">도서명</MenuItem>
          <MenuItem value="author">저자</MenuItem>
          <MenuItem value="press">출판사</MenuItem>
          <MenuItem value="agegroup">연령대</MenuItem>
          <MenuItem value="tag">태그</MenuItem>
          <MenuItem value="location">서가 위치</MenuItem>
          <MenuItem value="isbn">바코드 (ISBN)</MenuItem>
        </Select>
      </FormControl>
      <TextField
        className={classes.textfield}
        variant="outlined"
        value={keyword}
        onChange={handleTextFieldChange}
        onKeyPress={handleKeyPress}
        spellCheck={false}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={handleSearchClick}
              className={classes.iconButton}
            >
              <SearchIcon />
            </IconButton>
          ),
          className: classes.bodyFont,
        }}
      />
    </div>
  );
};

export default InputBoard;
