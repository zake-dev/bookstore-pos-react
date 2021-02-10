import React, { createContext, useReducer, useContext, Dispatch } from "react";

import Book from "@interfaces/Book";

type State = {
  list: Book[];
  selected: string[];
  isEditMode: boolean;
  page: number;
};

type Action =
  | { type: "SET_LIST"; list: Book[] }
  | { type: "TOGGLE_EDIT_MODE" }
  | { type: "SET_PAGE"; page: number }
  | { type: "SET_ROWS_COUNT"; rowsCount: number }
  | { type: "SET_SELECTED"; selected: string[] };

const initialState: State = {
  list: [],
  selected: [],
  isEditMode: false,
  page: 0,
};

const InventoryStateContext = createContext<State | null>(null);
const InventoryDispatchContext = createContext<Dispatch<Action> | null>(null);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_LIST":
      return {
        ...state,
        list: action.list,
      };
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

export const InventoryStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <InventoryStateContext.Provider value={state as State}>
      <InventoryDispatchContext.Provider value={dispatch}>
        {children}
      </InventoryDispatchContext.Provider>
    </InventoryStateContext.Provider>
  );
};

export const useInventoryState = () => {
  const state = useContext(InventoryStateContext);
  if (!state) throw new Error("Cannot find InventoryStateProvider");
  return state;
};

export const useInventoryDispatch = () => {
  const dispatch = useContext(InventoryDispatchContext);
  if (!dispatch) throw new Error("Cannot find InventoryStateProvider");
  return dispatch;
};
