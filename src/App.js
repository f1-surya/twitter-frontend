import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Thread from "./components/Thread";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={"profile"} element={<Profile />} />
          <Route path={"profile/likes"} element={<Profile type={"likes"} />} />
          <Route path={"tweet"} element={<Thread />} />
        </Route>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signUp"} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}