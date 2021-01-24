import React from "react";
import { hot } from "react-hot-loader/root";

import { SideNav } from "@components/SideNav";
import { SellPage } from "@pages/SellPage";

function App() {
  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <SideNav />
      <SellPage />
    </div>
  );
}

export default hot(App);
