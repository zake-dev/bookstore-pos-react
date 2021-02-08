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
import Tag from "@interfaces/Tag";
import ConfirmDialog from "@components/ConfirmDialog";
import Toast, { severityType } from "@components/Toast";
import {
  addTagEntity,
  deleteTagEntity,
  findTagEntity,
  getAllTagEntities,
} from "@db/tagDataAccess";

import { useStyles } from "./styles";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const TagEditDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { open, setOpen } = props;
  const [tags, setTags] = React.useState([] as Tag[]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
  const [addConfirmOpen, setAddConfirmOpen] = React.useState(false);
  const [selected, setSelected] = React.useState({} as Tag);
  const [text, setText] = React.useState("");
  const [toastOpen, setToastOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("success" as severityType);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const tags = await getAllTagEntities();
      setTags(tags);
    };
    fetchData();
  }, []);

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
      setMessage("태그이름을 먼저 입력해주세요.");
      setToastOpen(true);
      return;
    }

    setAddConfirmOpen(true);
  };

  const handleDeleteTag = async () => {
    await deleteTagEntity(selected);
    const tags = await getAllTagEntities();
    setTags(tags);

    setDeleteConfirmOpen(false);
    setToastOpen(false);
    setSeverity("success");
    setMessage(`태그 <${selected.description}>을(를) 삭제했습니다.`);
    setToastOpen(true);
  };

  const handleAddTag = async () => {
    if (await findTagEntity(text.trim())) {
      setToastOpen(false);
      setSeverity("error");
      setMessage(`태그 <${text.trim()}>은(는) 이미 등록된 태그입니다.`);
      setToastOpen(true);
      setAddConfirmOpen(false);
      setText("");
      return;
    }

    await addTagEntity(text.trim());
    const tags = await getAllTagEntities();
    setTags(tags);

    setAddConfirmOpen(false);
    setToastOpen(false);
    setSeverity("success");
    setMessage(`태그 <${text.trim()}>을(를) 추가했습니다.`);
    setToastOpen(true);
    setText("");
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography className={classes.title}>태그관리</Typography>
        </DialogTitle>
        <Paper className={classes.tagBox}>
          <List className={classes.tagList}>
            {tags.map((tag) => (
              <Chip
                className={classes.tagChip}
                color="default"
                label={
                  <Typography className={classes.tagLabel}>
                    {tag.description}
                  </Typography>
                }
                onDelete={() => {
                  setSelected(tag);
                  setDeleteConfirmOpen(true);
                }}
              />
            ))}
          </List>
        </Paper>
        <TextField
          className={classes.textfield}
          variant="outlined"
          placeholder="새로운 태그이름을 입력하세요"
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
        title="태그삭제"
        description={`태그 <${selected.description}>을(를) 삭제하시겠습니까?\n\u203b 관련 자료들이 데이터베이스 상에서 영구소실됩니다!`}
        confirmLabel="삭제하기"
        cancelLabel="취소"
        handleConfirm={handleDeleteTag}
      />
      <ConfirmDialog
        open={addConfirmOpen}
        setOpen={setAddConfirmOpen}
        title="태그추가"
        description={`태그 <${text.trim()}>을(를) 추가하시겠습니까?`}
        confirmLabel="추가하기"
        cancelLabel="취소"
        handleConfirm={handleAddTag}
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
