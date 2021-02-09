import React from "react";
import { Switch, Route } from "react-router-dom";

import Sell from "@pages/Sell";
import Register from "@pages/Register";
import Return from "@pages/Return";
import Transactions from "@pages/Transactions";
import Inventory from "@pages/Inventory";
import { InventoryStateProvider } from "@reducers/InventoryStates";
import { TransactionsStateProvider } from "@reducers/TransactionsStates";

export const SellRoute = "/sell";
export const RegisterRoute = "/register";
export const ReturnRoute = "/return";
export const TransactionsRoute = "/transactions";
export const InventoryRoute = "/inventory";

const Routing = () => (
  <Switch>
    <Route path="/" exact component={Sell} />
    <Route path={SellRoute} exact component={Sell} />
    <Route path={RegisterRoute} exact component={Register} />
    <Route path={ReturnRoute} exact component={Return} />
    <Route path={TransactionsRoute} exact>
      <TransactionsStateProvider>
        <Transactions />
      </TransactionsStateProvider>
    </Route>
    <Route path={InventoryRoute} exact>
      <InventoryStateProvider>
        <Inventory />
      </InventoryStateProvider>
    </Route>
  </Switch>
);

export default Routing;
