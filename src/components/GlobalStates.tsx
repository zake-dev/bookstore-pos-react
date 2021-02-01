import React, { createContext, useReducer, useContext, Dispatch } from "react";

import Book from "@interfaces/Book";

type State = {
  currentRoute: string;
  sellList: Book[];
  inventoryList: Book[];
  inventoryProps: { isEditMode: boolean; page: number };
};

type Action =
  | { type: "SET_CURRENT_ROUTE"; route: string }
  | { type: "ADD_BOOK_TO_SELL"; book: Book }
  | { type: "REMOVE_BOOK_FROM_SELL"; index: number }
  | { type: "UPDATE_QTY_FROM_SELL"; index: number; qty: number }
  | { type: "REFRESH_SELL"; list: Book[] }
  | { type: "SET_INVENTORY"; list: Book[] }
  | { type: "TOGGLE_INVENTORY_EDIT_MODE" }
  | { type: "SET_INVENTORY_PAGE"; page: number };

const initialState: State = {
  currentRoute: "판매하기",
  sellList: [],
  inventoryList: [],
  inventoryProps: { isEditMode: false, page: 0 },
};

const GlobalStateContext = createContext<State | null>(null);
const GlobalDispatchContext = createContext<Dispatch<Action> | null>(null);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_CURRENT_ROUTE":
      return { ...state, currentRoute: action.route };
    case "ADD_BOOK_TO_SELL":
      action.book.currentQuantity = 1;
      return { ...state, sellList: state.sellList.concat(action.book) };
    case "REMOVE_BOOK_FROM_SELL":
      state.sellList.splice(action.index, 1);
      return { ...state, sellList: state.sellList };
    case "UPDATE_QTY_FROM_SELL":
      state.sellList[action.index].currentQuantity = action.qty;
      return { ...state, sellList: state.sellList };
    case "REFRESH_SELL":
      return { ...state, sellList: action.list };
    case "SET_INVENTORY":
      return {
        ...state,
        inventoryList: action.list,
      };
    case "TOGGLE_INVENTORY_EDIT_MODE":
      return {
        ...state,
        inventoryProps: {
          ...state.inventoryProps,
          isEditMode: !state.inventoryProps.isEditMode,
        },
      };
    case "SET_INVENTORY_PAGE":
      return {
        ...state,
        inventoryProps: { ...state.inventoryProps, page: action.page },
      };
  }
};

export const GlobalStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={state as State}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const state = useContext(GlobalStateContext);
  if (!state) throw new Error("Cannot find GlobalStateProvider");
  return state;
};

export const useGlobalDispatch = () => {
  const dispatch = useContext(GlobalDispatchContext);
  if (!dispatch) throw new Error("Cannot find GlobalStateProvider");
  return dispatch;
};
