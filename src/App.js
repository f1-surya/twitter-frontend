import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Thread from "./components/Thread";
import Layout from "./Layout";
import Follow from "./pages/Follow";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { SignUp, Username, Password } from "./pages/SignUp";
import UserList from "./pages/UserList";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile">
            <Route path=":user" element={<Profile />} />
            <Route path=":user/:type" element={<Follow />} />
          </Route>
          <Route path="content/:pk" element={<Thread />} />
          <Route path="users" element={<UserList />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />}>
          <Route path="names" element={<Username />} />
          <Route path="password" element={<Password />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}