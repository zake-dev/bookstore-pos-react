import React, { createContext, useReducer, useContext, Dispatch } from "react";

import Transaction from "@interfaces/Transaction";

type State = {
  list: Transaction[];
  selected: number[];
  isEditMode: boolean;
  page: number;
};

type Action =
  | { type: "SET_LIST"; list: Transaction[] }
  | { type: "TOGGLE_EDIT_MODE" }
  | { type: "SET_PAGE"; page: number }
  | { type: "SET_ROWS_COUNT"; rowsCount: number }
  | { type: "SET_SELECTED"; selected: number[] };

const initialState: State = {
  list: [],
  selected: [],
  isEditMode: false,
  page: 0,
};

const TransactionsStateContext = createContext<State | null>(null);
const TransactionsDispatchContext = createContext<Dispatch<Action> | null>(
  null,
);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_LIST":
      return { ...state, list: action.list };
    case "TOGGLE_EDIT_MODE":
      return {
        ...state,
        isEditMode: !state.isEditMode,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.page,
      };
    case "SET_SELECTED":
      return {
        ...state,
        selected: action.selected,
      };
  }
};

export const TransactionsStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TransactionsStateContext.Provider value={state as State}>
      <TransactionsDispatchContext.Provider value={dispatch}>
        {children}
      </TransactionsDispatchContext.Provider>
    </TransactionsStateContext.Provider>
  );
};

export const useTransactionsState = () => {
  const state = useContext(TransactionsStateContext);
  if (!state) throw new Error("Cannot find TransactionsStateProvider");
  return state;
};

export const useTransactionsDispatch = () => {
  const dispatch = useContext(TransactionsDispatchContext);
  if (!dispatch) throw new Error("Cannot find TransactionsStateProvider");
  return dispatch;
};
