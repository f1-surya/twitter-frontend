import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Thread from "./components/Thread";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import SignUp from "./pages/SignUp";
import UserList from "./pages/UserList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile">
            <Route path=":user/:query" element={<Profile />} />
          </Route>
          <Route path="content/:pk" element={<Thread />} />
          <Route path="users" element={<UserList />} />
          <Route path="/search" element={<Search />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}