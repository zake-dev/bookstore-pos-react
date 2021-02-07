import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import HomeIcon from "@material-ui/icons/Home";

import { useStyles } from "./styles";

const ButtonBoard = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.column}>
        <FormControl variant="outlined">
          <InputLabel className={classes.inputLabel}>현재 매입처</InputLabel>
          <Select className={classes.select}>
            <MenuItem>서당</MenuItem>
            <MenuItem>위드북</MenuItem>
          </Select>
        </FormControl>
        <Button className={classes.button} variant="contained">
          <HomeIcon className={classes.buttonIcon} />
          매입처관리
        </Button>
      </div>
      <div className={classes.column}>
        <Button className={classes.button} variant="contained">
          <AddCircleRoundedIcon className={classes.buttonIcon} />
          신간등록
        </Button>
        <Button className={classes.button} variant="contained">
          <LocalOfferIcon className={classes.buttonIcon} />
          태그관리
        </Button>
      </div>
    </>
  );
};

export default ButtonBoard;
