import React from "react";
import {
  Dialog,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  IconButton,
  Tooltip,
  Paper,
  Chip,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import Book from "@interfaces/Book";
import { getBookEntity } from "@db/bookDataAccess";
import Agegroup from "@interfaces/Agegroup";
import Tag from "@interfaces/Tag";
import { useGlobalState, useGlobalDispatch } from "@reducers/GlobalStates";
import { getAllAgegroupEntities } from "@db/agegroupDataAccess";
import { findAllTagEntities } from "@db/tagDataAccess";

import { useStyles } from "./styles";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  editMode: boolean;
  isbn?: string;
};

const AddEditBookDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useGlobalDispatch();
  const { open, setOpen, editMode, isbn } = props;
  const { registerList, vendorList } = useGlobalState();
  const [agegroups, setAgegroups] = React.useState([] as Agegroup[]);
  const [book, setBook] = React.useState({} as Book);

  // Form states
  const [barcode, setBarcode] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [press, setPress] = React.useState("");
  const [agegroupsId, setAgegroupsId] = React.useState(-1);
  const [location, setLocation] = React.useState(-1);
  const [price, setPrice] = React.useState(-1);
  const [quantity, setQuantity] = React.useState(-1);
  const [tags, setTags] = React.useState([] as Tag[]);

  React.useEffect(() => {
    const fetchData = async () => {
      const agegroups = await getAllAgegroupEntities();
      setAgegroups(agegroups);

      if (!isbn) return;
      const book = await getBookEntity(isbn);
      setBook(book);
      const tags = await findAllTagEntities(isbn);
      setTags(tags);
    };
    fetchData();
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography className={classes.title}>
          {editMode ? "도서수정" : "신간등록"}
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <TextField
          className={classes.textfield}
          variant="outlined"
          label="ISBN"
          spellCheck={false}
          InputProps={{
            endAdornment: (
              <Tooltip title="도서정보 가져오기" arrow>
                <IconButton className={classes.iconButton}>
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            ),
          }}
        />

        <TextField
          className={classes.textfield}
          variant="outlined"
          label="도서명"
          spellCheck={false}
        />
        <div className={classes.row}>
          <TextField
            className={classes.textfield}
            variant="outlined"
            label="저자"
            spellCheck={false}
          />
          <TextField
            className={classes.textfield}
            variant="outlined"
            label="출판사"
            spellCheck={false}
          />
        </div>
        <div className={classes.row}>
          <FormControl className={classes.agegroupsMenu} variant="outlined">
            <InputLabel>연령대</InputLabel>
            <Select>
              {agegroups.map((agegroup) => (
                <MenuItem key={agegroup.id}>{agegroup.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className={classes.textfield}
            variant="outlined"
            label="서가위치"
            spellCheck={false}
          />
        </div>
        <div className={classes.row}>
          <TextField
            className={classes.textfield}
            variant="outlined"
            label="정가"
            spellCheck={false}
          />
          <TextField
            type="number"
            className={classes.textfield}
            variant="outlined"
            label="수량"
            spellCheck={false}
          />
        </div>
        <Paper className={classes.tagBox} elevation={0}>
          {tags &&
            tags.map((tag) => (
              <Chip
                key={tag.id}
                className={classes.tagChip}
                icon={<LocalOfferIcon />}
                label={
                  <Typography className={classes.tagLabel}>
                    {tag.description}
                  </Typography>
                }
                onDelete={() => {}}
              />
            ))}
          <Tooltip title="태그추가" arrow>
            <Chip
              className={classes.tagChip}
              label={
                <IconButton className={classes.iconButton}>
                  <AddIcon />
                </IconButton>
              }
            />
          </Tooltip>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button className={classes.actionLabel}>
          {editMode ? "수정하기" : "등록하기"}
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
  );
};

export default AddEditBookDialog;
