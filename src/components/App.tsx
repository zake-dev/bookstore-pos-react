import React from "react";
import { hot } from "react-hot-loader/root";
import { HashRouter as Router } from "react-router-dom";

import { SideNav } from "@components/SideNav";
import { GlobalStateProvider } from "@reducers/GlobalStates";

import Routing from "./Routing";

function App() {
  return (
    <Router>
      <SideNav />
      <GlobalStateProvider>
        <Routing />
      </GlobalStateProvider>
    </Router>
  );
}

export default hot(App);
