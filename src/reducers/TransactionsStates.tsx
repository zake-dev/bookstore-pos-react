import React, { createContext, useReducer, useContext, Dispatch } from "react";

import Transaction from "@interfaces/Transaction";

type State = {
  list: Transaction[];
};

type Action = { type: "SET_LIST"; list: Transaction[] };

const initialState: State = {
  list: [],
};

const TransactionsStateContext = createContext<State | null>(null);
const TransactionsDispatchContext = createContext<Dispatch<Action> | null>(
  null,
);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_LIST":
      return { ...state, list: action.list };
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
