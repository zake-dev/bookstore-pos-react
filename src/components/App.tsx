import React from "react";
import { hot } from "react-hot-loader/root";
import { HashRouter as Router } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import "moment/locale/ko";

import { SideNav } from "@components/SideNav";
import { GlobalStateProvider } from "@reducers/GlobalStates";

import Routing from "./Routing";

moment.locale("ko");

function App() {
  return (
    <MuiPickersUtilsProvider
      libInstance={moment}
      utils={MomentUtils}
      locale="ko"
    >
      <Router>
        <SideNav />
        <GlobalStateProvider>
          <Routing />
        </GlobalStateProvider>
      </Router>
    </MuiPickersUtilsProvider>
  );
}

export default hot(App);
