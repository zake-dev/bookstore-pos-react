import React from "react";
import { hot } from "react-hot-loader/root";
import { HashRouter as Router, Link } from "react-router-dom";

import { SideNav } from "@components/SideNav";

import Routing from "./Routing";

function App() {
  return (
    <Router>
      <SideNav />
      <Routing />
    </Router>
  );
}

export default hot(App);
