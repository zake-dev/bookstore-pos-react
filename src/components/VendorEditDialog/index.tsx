import React from "react";

import {
  Dialog,
  Typography,
  Paper,
  List,
  Chip,
  TextField,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ConfirmDialog from "@components/ConfirmDialog";
import Toast, { severityType } from "@components/Toast";
import Vendor from "@interfaces/Vendor";
import { useGlobalDispatch, useGlobalState } from "@reducers/GlobalStates";
import {
  getAllVendorEntities,
  addVendorEntity,
  deleteVendorEntity,
  findVendorEntity,
} from "@db/vendorDataAccess";

import { useStyles } from "./styles";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const TagEditDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useGlobalDispatch();
  const { open, setOpen } = props;
  const { vendorList } = useGlobalState();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
  const [addConfirmOpen, setAddConfirmOpen] = React.useState(false);
  const [selected, setSelected] = React.useState({} as Vendor);
  const [text, setText] = React.useState("");
  const [toastOpen, setToastOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("success" as severityType);
  const [message, setMessage] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!text.length) {
      setToastOpen(false);
      setSeverity("error");
      setMessage("매입처이름을 먼저 입력해주세요.");
      setToastOpen(true);
      return;
    }

    setAddConfirmOpen(true);
  };

  const handleDeleteVendor = async () => {
    await deleteVendorEntity(selected);
    const vendors = await getAllVendorEntities();
    dispatch({ type: "SET_VENDOR_LIST", list: vendors });

    setDeleteConfirmOpen(false);
    setToastOpen(false);
    setSeverity("success");
    setMessage(`매입처 <${selected.name}>을(를) 삭제했습니다.`);
    setToastOpen(true);
  };

  const handleAddVendor = async () => {
    if (await findVendorEntity(text.trim())) {
      setToastOpen(false);
      setSeverity("error");
      setMessage(`매입처 <${text.trim()}>은(는) 이미 등록된 매입처입니다.`);
      setToastOpen(true);
      setAddConfirmOpen(false);
      setText("");
      return;
    }

    await addVendorEntity(text.trim());
    const vendors = await getAllVendorEntities();
    dispatch({ type: "SET_VENDOR_LIST", list: vendors });

    setAddConfirmOpen(false);
    setToastOpen(false);
    setSeverity("success");
    setMessage(`매입처 <${text.trim()}>을(를) 추가했습니다.`);
    setToastOpen(true);
    setText("");
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography className={classes.title}>매입처관리</Typography>
        </DialogTitle>
        <Paper className={classes.tagBox} elevation={0}>
          <List className={classes.tagList}>
            {vendorList.map((vendor) => (
              <Chip
                className={classes.tagChip}
                color="default"
                label={
                  <Typography className={classes.tagLabel}>
                    {vendor.name}
                  </Typography>
                }
                onDelete={() => {
                  setSelected(vendor);
                  setDeleteConfirmOpen(true);
                }}
              />
            ))}
          </List>
        </Paper>
        <TextField
          className={classes.textfield}
          variant="outlined"
          placeholder="새로운 매입처이름을 입력하세요"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          onKeyPress={handleKeyPress}
          spellCheck={false}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSubmit} className={classes.iconButton}>
                <AddCircleIcon />
              </IconButton>
            ),
          }}
        />
      </Dialog>
      <ConfirmDialog
        open={deleteConfirmOpen}
        setOpen={setDeleteConfirmOpen}
        title="매입처삭제"
        description={`매입처 <${selected.name}>을(를) 삭제하시겠습니까?\n\u203b 관련 자료들이 데이터베이스 상에서 영구소실됩니다!`}
        confirmLabel="삭제하기"
        cancelLabel="취소"
        handleConfirm={handleDeleteVendor}
      />
      <ConfirmDialog
        open={addConfirmOpen}
        setOpen={setAddConfirmOpen}
        title="매입처추가"
        description={`매입처 <${text.trim()}>을(를) 추가하시겠습니까?`}
        confirmLabel="추가하기"
        cancelLabel="취소"
        handleConfirm={handleAddVendor}
      />
      <Toast
        open={toastOpen}
        setOpen={setToastOpen}
        severity={severity}
        message={message}
      />
    </>
  );
};

export default TagEditDialog;
