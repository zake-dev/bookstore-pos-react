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
import { useGlobalState, useGlobalDispatch } from "@reducers/GlobalStates";
import { getAllVendorsEntity } from "@db/vendorDataAccess";
import Vendor from "@interfaces/Vendor";

import { useStyles } from "./styles";

const ButtonBoard = () => {
  const classes = useStyles();
  const dispatch = useGlobalDispatch();
  const {
    vendorList: list,
    registerVendorSelected: selected,
  } = useGlobalState();

  React.useEffect(() => {
    const fetchData = async () => {
      const list = await getAllVendorsEntity();
      dispatch({ type: "SET_VENDOR_LIST", list: list });
    };
    fetchData();
  }, []);

  const handleSelectChange = (event: any) => {
    const findVendor = () => {
      for (let vendor of list)
        if (vendor.id === event.target.value) return vendor;
    };
    dispatch({
      type: "SET_REGISTER_VENDOR_SELECTED",
      selected: findVendor() as Vendor,
    });
  };

  return (
    <>
      <div className={classes.column}>
        <FormControl variant="outlined">
          <InputLabel id="vendor-select-label" className={classes.inputLabel}>
            현재 매입처
          </InputLabel>
          <Select
            className={classes.select}
            labelId="vendor-select-label"
            label="현재 매입처"
            value={selected.id}
            onChange={handleSelectChange}
          >
            {list.map((vendor) => (
              <MenuItem value={vendor.id}>{vendor.name}</MenuItem>
            ))}
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
