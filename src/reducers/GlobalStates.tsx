import React, { createContext, useReducer, useContext, Dispatch } from "react";

import Book from "@interfaces/Book";
import Vendor from "@interfaces/Vendor";

type State = {
  sellList: Book[];
  discountRate: number;
  registerList: Book[];
  vendorList: Vendor[];
  registerVendorSelected: Vendor;
  returnList: Book[];
  returnVendorSelected: Vendor;
};

type Action =
  | { type: "ADD_BOOK_TO_SELL"; book: Book }
  | { type: "REMOVE_BOOK_FROM_SELL"; index: number }
  | { type: "UPDATE_QTY_FROM_SELL"; index: number; qty: number }
  | { type: "REFRESH_SELL_WITH"; list: Book[] }
  | { type: "SET_DISCOUNT_RATE"; rate: number }
  | { type: "ADD_BOOK_TO_REGISTER"; book: Book }
  | { type: "REMOVE_BOOK_FROM_REGISTER"; index: number }
  | { type: "UPDATE_BOOK_FROM_REGISTER"; index: number; book: Book }
  | { type: "REFRESH_REGISTER_WITH"; list: Book[] }
  | { type: "SET_VENDOR_LIST"; list: Vendor[] }
  | { type: "SET_REGISTER_VENDOR_SELECTED"; selected: Vendor }
  | { type: "ADD_BOOK_TO_RETURN"; book: Book }
  | { type: "REMOVE_BOOK_FROM_RETURN"; index: number }
  | { type: "UPDATE_QTY_FROM_RETURN"; index: number; qty: number }
  | { type: "REFRESH_RETURN_WITH"; list: Book[] }
  | { type: "SET_RETURN_VENDOR_SELECTED"; selected: Vendor };

const initialState: State = {
  sellList: [],
  discountRate: 0,
  registerList: [],
  vendorList: [],
  registerVendorSelected: {} as Vendor,
  returnList: [],
  returnVendorSelected: {} as Vendor,
};

const GlobalStateContext = createContext<State | null>(null);
const GlobalDispatchContext = createContext<Dispatch<Action> | null>(null);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_BOOK_TO_SELL":
      action.book.currentQuantity = 1;
      return { ...state, sellList: state.sellList.concat(action.book) };
    case "REMOVE_BOOK_FROM_SELL":
      state.sellList.splice(action.index, 1);
      return { ...state, sellList: state.sellList };
    case "UPDATE_QTY_FROM_SELL":
      state.sellList[action.index].currentQuantity = action.qty;
      return { ...state, sellList: state.sellList };
    case "REFRESH_SELL_WITH":
      return { ...state, sellList: action.list };
    case "SET_DISCOUNT_RATE":
      return { ...state, discountRate: action.rate };
    case "ADD_BOOK_TO_REGISTER":
      action.book.currentQuantity = 1;
      return { ...state, registerList: state.registerList.concat(action.book) };
    case "REMOVE_BOOK_FROM_REGISTER":
      state.registerList.splice(action.index, 1);
      return { ...state, registerList: state.registerList };
    case "UPDATE_BOOK_FROM_REGISTER":
      state.registerList[action.index] = action.book;
      return { ...state, registerList: state.registerList };
    case "REFRESH_REGISTER_WITH":
      return { ...state, registerList: action.list };
    case "SET_VENDOR_LIST":
      return { ...state, vendorList: action.list };
    case "SET_REGISTER_VENDOR_SELECTED":
      return { ...state, registerVendorSelected: action.selected };
    case "ADD_BOOK_TO_RETURN":
      action.book.currentQuantity = 1;
      return { ...state, returnList: state.returnList.concat(action.book) };
    case "REMOVE_BOOK_FROM_RETURN":
      state.returnList.splice(action.index, 1);
      return { ...state, returnList: state.returnList };
    case "UPDATE_QTY_FROM_RETURN":
      state.returnList[action.index].currentQuantity = action.qty;
      return { ...state, sellList: state.sellList };
    case "REFRESH_RETURN_WITH":
      return { ...state, returnList: action.list };
    case "SET_RETURN_VENDOR_SELECTED":
      return { ...state, returnVendorSelected: action.selected };
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
