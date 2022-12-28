import LeftNavBar from "./components/LeftNavBar";
import React from "react";
import {Outlet} from "react-router-dom";
import Searchbar from "./components/Searchbar";

export default function Layout() {

  return (
      <div className={"App"}>
        <LeftNavBar className={"navbar"}/>
        <Outlet/>
        <Searchbar/>
      </div>
  )
}