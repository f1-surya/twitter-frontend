import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

export default function App() {
  const tweets = [
    {
      body: "Hello World!",
      postedBy: "Surya",
      likes: 0,
      likedByUser: false
    },
    {
      body: "Test",
      postedBy: "user1",
      likes: 0,
      likedByUser: false
    },
    {
      body: `But I wonder where were you?
      When I was at my worst down on my knees
      And you said you had my back
      So I wonder where were you?
      When all the road you took came back to me
      So I'm following the map that leads to you
      `,
      postedBy: "Maroon5",
      likes: 0,
      likedByUser: false
    },
    {
      body: `It's over Anakin.
      I have the high ground`,
      postedBy: "Obi-Wan Kenobi",
      likes: 21,
      likedByUser: false
    },
    {
      body: "I hate you!!!!",
      postedBy: "Anakin Skywalker",
      likes: 20,
      likedByUser: false
    }
  ];
  const style = {
    width: "50%",
    position: "relative",
    paddingTop: "10px",
    left: "20%"
  }
  return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout/>}>
            <Route index element={<Home value={tweets} style={style}/>}/>
            <Route path={"profile"} element={<Profile/>}/>
            <Route path={"profile/likes"} element={<Profile type={"likes"}/>}/>
          </Route>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/signUp"} element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
  );
}