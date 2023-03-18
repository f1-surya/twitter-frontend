import LeftNavBar from "./components/LeftNavBar";
import React from "react";
import { Outlet } from "react-router-dom";
import Explore from "./components/Explore";

export default function Layout() {

  return (
    <div className="App">
      <LeftNavBar className="navbar" />
      <Outlet />
      <Explore />
    </div>
  );
}