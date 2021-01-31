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

import { useStyles } from "./Styles";

const InputBoard = () => {
  const classes = useStyles();
  const [menu, setMenu] = React.useState("title");

  const handleMenuChange = (event: any) => {
    setMenu(event.target.value);
  };

  const handleTextFieldChange = (event: any) => {};

  const handleKeyPress = (event: any) => {};

  const handleSubmit = () => {};

  return (
    <div>
      <FormControl variant="outlined">
        <InputLabel>검색조건</InputLabel>
        <Select
          className={classes.select}
          label="검색조건"
          value={menu}
          onChange={handleMenuChange}
        >
          <MenuItem value="title">도서명</MenuItem>
          <MenuItem value="author">저자</MenuItem>
          <MenuItem value="press">출판사</MenuItem>
          <MenuItem value="agegroup">연령대</MenuItem>
          <MenuItem value="tag">태그</MenuItem>
          <MenuItem value="location">서가 위치</MenuItem>
          <MenuItem value="barcode">바코드</MenuItem>
        </Select>
      </FormControl>
      <TextField
        className={classes.textfield}
        variant="outlined"
        onChange={handleTextFieldChange}
        onKeyPress={handleKeyPress}
        autoFocus
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => {
                handleSubmit();
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
