import React from "react";
import {
  Table as MuiTable,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Switch,
  Typography,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { useGlobalState, useGlobalDispatch } from "@components/GlobalStates";
import BookDetailsDialog from "@components/BookDetailsDialog";

import { useStyles } from "./styles";

const Table = () => {
  const classes = useStyles();
  const dispatch = useGlobalDispatch();
  const state = useGlobalState();
  const [isbn, setIsbn] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [rowsCount, setRowsCount] = React.useState(10);
  const page = state.inventoryProps.page;

  const handleDoubleClickOpen = (isbn: string) => {
    setIsbn(isbn);
    setOpen(true);
  };

  const handleChangePage = (event: any, newPage: number) => {
    dispatch({ type: "SET_INVENTORY_PAGE", page: newPage });
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsCount(event.target.value);
  };

  const handleEditSwitch = () => {
    dispatch({ type: "TOGGLE_INVENTORY_EDIT_MODE" });
  };

  const handleDeleteRow = async (index: number, isbn: string) => {};

  const handleEditRow = async (index: number, isbn: string) => {};

  return (
    <Paper className={classes.tableContainer}>
      <TableContainer>
        <MuiTable aria-label="판매" size="small">
          <TableHead>
            <TableRow>
              <TableCell
                className={classes.headerCell}
                align="center"
                width="3%"
              >
                #
              </TableCell>
              <TableCell
                className={classes.headerCell}
                align="center"
                width="37%"
              >
                제목
              </TableCell>
              <TableCell
                className={classes.headerCell}
                align="center"
                width="10%"
              >
                저자
              </TableCell>
              <TableCell
                className={classes.headerCell}
                align="center"
                width="10%"
              >
                출판사
              </TableCell>
              <TableCell
                className={classes.headerCell}
                align="center"
                width="10%"
              >
                연령대
              </TableCell>
              <TableCell
                className={classes.headerCell}
                align="center"
                width="10%"
              >
                서가 위치
              </TableCell>
              <TableCell
                className={classes.headerCell}
                align="center"
                width="10%"
              >
                정가 (원)
              </TableCell>
              <TableCell
                className={classes.headerCell}
                align="center"
                width="5%"
              >
                수량 (권)
              </TableCell>
              {state.inventoryProps.isEditMode && (
                <TableCell
                  className={classes.headerCell}
                  align="center"
                  width="5%"
                ></TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {state.inventoryList
              .slice(page * rowsCount, page * rowsCount + rowsCount)
              .map((book, index) => (
                <TableRow
                  className={classes.bodyRow}
                  key={index}
                  onDoubleClick={() => {
                    handleDoubleClickOpen(book.isbn);
                  }}
                >
                  <TableCell className={classes.indexCell} align="center">
                    {page * rowsCount + index + 1}
                  </TableCell>
                  <TableCell
                    className={classes.bodyCell}
                    align="left"
                    style={{ maxWidth: "12rem", textOverflow: "ellipsis" }}
                  >
                    {book.title}
                  </TableCell>
                  <TableCell
                    className={classes.bodyCell}
                    align="left"
                    style={{ maxWidth: "1rem", textOverflow: "ellipsis" }}
                  >
                    {book.author}
                  </TableCell>
                  <TableCell
                    className={classes.bodyCell}
                    align="left"
                    style={{ maxWidth: "1rem", textOverflow: "ellipsis" }}
                  >
                    {book.press}
                  </TableCell>
                  <TableCell
                    className={classes.bodyCell}
                    align="center"
                    style={{ maxWidth: "1rem", textOverflow: "ellipsis" }}
                  >
                    {book.agegroup}
                  </TableCell>
                  <TableCell className={classes.bodyCell} align="center">
                    {book.location}
                  </TableCell>
                  <TableCell className={classes.bodyCell} align="center">
                    {"\u20a9"}
                    {new Intl.NumberFormat("ko-KR").format(book.price)}
                  </TableCell>
                  <TableCell className={classes.bodyCell} align="center">
                    {book.quantity}
                  </TableCell>
                  {state.inventoryProps.isEditMode && (
                    <TableCell className={classes.bodyCell} align="center">
                      <IconButton
                        className={classes.iconButton}
                        aria-label="수정"
                        onClick={() => handleEditRow(index, book.isbn)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        className={classes.iconButton}
                        aria-label="삭제"
                        onClick={() => handleDeleteRow(index, book.isbn)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {state.inventoryList.length == 0 && (
        <div className={classes.emptyTableContent}>
          <span className={classes.emptyTableContentText}>
            일치하는 검색결과가 없습니다
          </span>
        </div>
      )}
      <div className={classes.tableFooter}>
        <div className={classes.editSwitch}>
          <Typography className={classes.editSwitchLabel}>검색</Typography>
          <Switch
            checked={state.inventoryProps.isEditMode}
            onChange={handleEditSwitch}
            color="primary"
          />
          <Typography className={classes.editSwitchLabel}>관리</Typography>
        </div>

        <TablePagination
          count={state.inventoryList.length}
          rowsPerPage={rowsCount}
          rowsPerPageOptions={[5, 10, 15]}
          labelRowsPerPage="페이지당 표시할 결과"
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>

      {isbn && <BookDetailsDialog isbn={isbn} open={open} setOpen={setOpen} />}
    </Paper>
  );
};

export default Table;
