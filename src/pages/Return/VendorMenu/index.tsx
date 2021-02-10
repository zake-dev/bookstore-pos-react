import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useGlobalState, useGlobalDispatch } from "@reducers/GlobalStates";
import { getAllVendorEntities } from "@db/vendorDataAccess";
import Vendor from "@interfaces/Vendor";

import { useStyles } from "./styles";

const VendorMenu = () => {
  const classes = useStyles();
  const dispatch = useGlobalDispatch();
  const { vendorList: list, returnVendorSelected: selected } = useGlobalState();

  React.useEffect(() => {
    const fetchData = async () => {
      const list = await getAllVendorEntities();
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
      type: "SET_RETURN_VENDOR_SELECTED",
      selected: findVendor() as Vendor,
    });
  };

  return (
    <FormControl variant="outlined">
      <InputLabel id="vendor-select-label" className={classes.inputLabel}>
        현재 반품처
      </InputLabel>
      <Select
        className={classes.select}
        labelId="vendor-select-label"
        label="현재 반품처"
        value={selected.id}
        onChange={handleSelectChange}
      >
        {list.map((vendor) => (
          <MenuItem value={vendor.id}>{vendor.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default VendorMenu;
