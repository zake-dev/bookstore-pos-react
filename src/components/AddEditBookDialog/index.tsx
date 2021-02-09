import React from "react";
import clsx from "clsx";
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
  InputAdornment,
} from "@material-ui/core";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import Book from "@interfaces/Book";
import {
  addBookEntity,
  getBookEntity,
  updateBookEntity,
} from "@db/bookDataAccess";
import Agegroup from "@interfaces/Agegroup";
import Tag from "@interfaces/Tag";
import { useGlobalDispatch } from "@reducers/GlobalStates";
import { getAllAgegroupEntities } from "@db/agegroupDataAccess";
import {
  addBookTagEntity,
  findAllTagEntities,
  deleteBookTagEntities,
} from "@db/tagDataAccess";
import Toast, { severityType } from "@components/Toast";
import { fetchBookFromApiEntity } from "@services/Api";

import { useStyles } from "./styles";
import AddTagDialog from "./AddTagDialog";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  editMode: boolean;
  inventoryMode: boolean;
  isbn?: string;
};

const AddEditBookDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useGlobalDispatch();
  const { open, setOpen, editMode, inventoryMode, isbn } = props;
  const [agegroups, setAgegroups] = React.useState([] as Agegroup[]);
  const [addTagOpen, setAddTagOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("success" as severityType);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  // Form states
  const [barcode, setBarcode] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [press, setPress] = React.useState("");
  const [agegroupsId, setAgegroupsId] = React.useState(10);
  const [location, setLocation] = React.useState(1);
  const [price, setPrice] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const [tags, setTags] = React.useState([] as Tag[]);

  // Form error
  const [barcodeError, setBarcodeError] = React.useState(false);
  const [titleError, setTitleError] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const agegroups = await getAllAgegroupEntities();
      setAgegroups(agegroups);

      if (!isbn) return;
      const book = await getBookEntity(isbn);
      // Load info on textfields
      setBarcode(book.isbn);
      setTitle(book.title);
      setAuthor(book.author);
      setPress(book.press);
      setAgegroupsId(book.agegroups_id);
      setLocation(book.location);
      setPrice(book.price);
      setQuantity(book.quantity);
      // Load tags
      const tags = await findAllTagEntities(isbn);
      setTags(tags);
    };
    fetchData();
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = async () => {
    if (!barcode || barcode.length !== 13) {
      setBarcodeError(true);
      return;
    }

    const book = await fetchBookFromApiEntity(barcode);
    setTitle(book.title);
    setAuthor(book.author);
    setPress(book.press);
    setPrice(book.price);

    setToastOpen(false);
    setSeverity("success");
    setMessage("도서정보를 불러왔습니다.");
    setToastOpen(true);
  };

  const handleSearchKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSubmit = async () => {
    // Validation
    if ((!barcode || barcode.length !== 13) && !title) {
      setBarcodeError(true);
      setTitleError(true);
      return;
    }
    // Error handling: 존재하는 도서
    if (!editMode && (await getBookEntity(barcode))) {
      setToastOpen(false);
      setSeverity("error");
      setMessage("이미 등록된 도서입니다.");
      setToastOpen(true);
      return;
    }

    const book = {
      isbn: barcode,
      title,
      author,
      press,
      agegroups_id: agegroupsId,
      location,
      price,
      quantity,
    } as Book;

    // Add book
    if (!editMode) {
      await addBookEntity(book);
      for (let tag of tags) {
        await addBookTagEntity(book, tag);
      }
      dispatch({ type: "ADD_BOOK_TO_REGISTER", book: book });

      setToastOpen(false);
      setSeverity("success");
      setMessage(
        `신규도서 "${title.slice(0, 10)}${
          title.length > 10 ? "..." : ""
        }"이(가) 등록되었습니다.`,
      );
      setToastOpen(true);
      setOpen(false);
      return;
    }

    // Edit book
    await updateBookEntity(book);
    await deleteBookTagEntities(book);
    for (let tag of tags) {
      await addBookTagEntity(book, tag);
    }

    setToastOpen(false);
    setSeverity("success");
    setMessage(
      `도서 "${title.slice(0, 10)}${
        title.length > 10 ? "..." : ""
      }"의 정보가 수정되었습니다.`,
    );
    setToastOpen(true);
    setOpen(false);
  };

  const handleAddTag = (tag: Tag) => {
    if (tags.map((tag) => tag.id).indexOf(tag.id) !== -1) return;

    setTags(tags.concat(tag));
  };

  const handleDeleteTag = (id: number) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography className={classes.title}>
            {editMode ? "도서수정" : "신간등록"}
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <TextField
            type="number"
            className={clsx(classes.textfield, classes.bigTextfield)}
            variant="outlined"
            label="ISBN"
            spellCheck={false}
            value={barcode}
            onChange={(event: any) => {
              setBarcodeError(false);
              setBarcode(event.target.value);
            }}
            onKeyPress={handleSearchKeyPress}
            error={barcodeError}
            helperText={barcodeError && "13자리 숫자만 입력가능합니다"}
            InputProps={{
              endAdornment: (
                <Tooltip title="도서정보 가져오기" arrow>
                  <IconButton
                    className={classes.iconButton}
                    onClick={handleSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />

          <TextField
            className={clsx(classes.textfield, classes.bigTextfield)}
            variant="outlined"
            label="도서명"
            spellCheck={false}
            value={title}
            onChange={(event: any) => {
              setTitleError(false);
              setTitle(event.target.value);
            }}
            error={titleError}
            helperText={titleError && "도서명을 입력해주세요"}
            inputProps={{ className: classes.textfieldInput }}
          />
          <div className={classes.row}>
            <TextField
              className={classes.textfield}
              variant="outlined"
              label="저자"
              spellCheck={false}
              value={author}
              onChange={(event: any) => {
                setAuthor(event.target.value);
              }}
              inputProps={{ className: classes.textfieldInput }}
            />
            <TextField
              className={classes.textfield}
              variant="outlined"
              label="출판사"
              spellCheck={false}
              value={press}
              onChange={(event: any) => {
                setPress(event.target.value);
              }}
              inputProps={{ className: classes.textfieldInput }}
            />
          </div>
          <div className={classes.row}>
            <FormControl className={classes.agegroupsMenu} variant="outlined">
              <InputLabel>연령대</InputLabel>
              <Select
                value={agegroupsId}
                onChange={(event: any) => {
                  setAgegroupsId(event.target.value);
                }}
                label="연령대"
              >
                {agegroups.map((agegroup) => (
                  <MenuItem key={agegroup.id} value={agegroup.id}>
                    {agegroup.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              type="number"
              className={classes.textfield}
              variant="outlined"
              label="서가위치"
              spellCheck={false}
              value={location}
              onChange={(event: any) => {
                setLocation(event.target.value);
              }}
              inputProps={{
                min: 1,
                max: 999,
                className: classes.textfieldInput,
              }}
            />
          </div>
          <div className={classes.row}>
            <TextField
              type="number"
              className={classes.textfield}
              variant="outlined"
              label="정가"
              spellCheck={false}
              value={price}
              onChange={(event: any) => {
                setPrice(event.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">{"\u20a9"}</InputAdornment>
                ),
              }}
              inputProps={{ min: 0, className: classes.textfieldInput }}
            />
            <TextField
              type="number"
              className={classes.textfield}
              variant="outlined"
              label="재고"
              spellCheck={false}
              disabled={!inventoryMode}
              value={quantity}
              onChange={(event: any) => {
                setQuantity(event.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">권</InputAdornment>
                ),
              }}
              inputProps={{
                min: 0,
                max: 999,
                className: classes.textfieldInput,
              }}
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
                  onDelete={() => {
                    handleDeleteTag(tag.id);
                  }}
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
                onClick={() => {
                  setAddTagOpen(true);
                }}
              />
            </Tooltip>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button className={classes.actionLabel} onClick={handleSubmit}>
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
      {addTagOpen && (
        <AddTagDialog
          open={addTagOpen}
          setOpen={setAddTagOpen}
          handleAddTag={handleAddTag}
        />
      )}
      <Toast
        open={toastOpen}
        setOpen={setToastOpen}
        severity={severity}
        message={message}
      />
    </>
  );
};

export default AddEditBookDialog;
