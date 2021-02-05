import React, { createContext, useReducer, useContext, Dispatch } from "react";

import Book from "@interfaces/Book";

type State = {
  sellList: Book[];
};

type Action =
  | { type: "ADD_BOOK_TO_SELL"; book: Book }
  | { type: "REMOVE_BOOK_FROM_SELL"; index: number }
  | { type: "UPDATE_QTY_FROM_SELL"; index: number; qty: number }
  | { type: "REFRESH_SELL_WITH"; list: Book[] };

const initialState: State = {
  sellList: [],
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
