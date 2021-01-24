import React from "react";
import { Switch, Route } from "react-router-dom";

import Sell from "@pages/Sell";
import Register from "@pages/Register";
import Return from "@pages/Return";
import Transactions from "@pages/Transactions";
import Inventory from "@pages/Inventory";

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
    <Route path={TransactionsRoute} exact component={Transactions} />
    <Route path={InventoryRoute} exact component={Inventory} />
  </Switch>
);

export default Routing;
