import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import TagEditDialog from "@components/TagEditDialog";
import Tag from "@interfaces/Tag";
import { getAllTagEntities, getTagEntity } from "@db/tagDataAccess";
import Toast from "@components/Toast";

import { useStyles } from "./styles";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleAddTag: (tag: Tag) => void;
};

const AddTagDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { open, setOpen, handleAddTag } = props;
  const [tags, setTags] = React.useState([] as Tag[]);
  const [selected, setSelected] = React.useState(-1);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [tagEditOpen, setTagEditOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const tags = await getAllTagEntities();
      setTags(tags);
    };
    fetchData();
  }, [tagEditOpen]);

  const handleSubmit = async () => {
    if (selected === -1) {
      setToastOpen(false);
      setToastOpen(true);
      return;
    }

    const newTag = await getTagEntity(selected);
    handleAddTag(newTag);
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>
          <Typography className={classes.title}>태그추가</Typography>
        </DialogTitle>
        <DialogContent>
          <FormControl className={classes.select} variant="outlined">
            <InputLabel>태그</InputLabel>
            <Select
              label="태그"
              value={selected}
              onChange={(event: any) => {
                setSelected(event.target.value);
              }}
            >
              <MenuItem value={-1}>
                <Typography className={classes.helperText}>
                  태그를 선택하세요
                </Typography>
              </MenuItem>
              {tags.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.editTagLabel}
            onClick={() => {
              setTagEditOpen(true);
            }}
          >
            태그관리
          </Button>
          <Button className={classes.addLabel} onClick={handleSubmit}>
            추가하기
          </Button>
          <Button
            className={classes.cancelLabel}
            onClick={() => {
              setOpen(false);
            }}
          >
            취소
          </Button>
        </DialogActions>
      </Dialog>
      {tagEditOpen && (
        <TagEditDialog open={tagEditOpen} setOpen={setTagEditOpen} />
      )}
      <Toast
        open={toastOpen}
        setOpen={setToastOpen}
        severity="error"
        message="태그를 먼저 선택해주세요."
      />
    </>
  );
};

export default AddTagDialog;
