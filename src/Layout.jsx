import { Outlet } from "react-router-dom";
import Explore from "./components/Explore";
import NavBar from "./components/NavBar";

export default function Layout() {

  return (
    <div className="App">
      <NavBar className="navbar" />
      <Outlet />
      <Explore />
    </div>
  );
}