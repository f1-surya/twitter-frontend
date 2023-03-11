import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import "./Login.css";

export default function Login() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState(true);

  function handleLoginCredentials(e) {
    setCredentials(!(!(!document.getElementById("userName").value)
      && !(!document.getElementById("password").value)));
  }

  function login() {
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    sessionStorage.username = userName;

    const config = {
      method: "post",
      url: "http://65.1.114.106/api/login",
      data: {
        username: userName,
        password: password
      }
    };

    if (sessionStorage.token === undefined) {
      axios(config)
        .then((response) => {
          sessionStorage.token = response.data["token"];
          navigate('/');
        })
        .catch((error) => {
          console.log(error.data);
        });
    }
  }

  document.title = "Login to twitter";

  return (
    <div className="login">
      <img id="logo" src={logo} alt="logo" />
      <div id="title">
        Login to Twitter
      </div>
      <div>Please enter your Username and Password</div>
      <div id="input">
        <div id="container">
          <input className="loginCredentials" id="userName"
            type="text" placeholder="Username"
            onChange={handleLoginCredentials} />
        </div>
        <div id="container">
          <input className="loginCredentials" id="password"
            type="password" placeholder="Password"
            onChange={handleLoginCredentials} />
        </div>
        <div id="container">
          <button className="button" type="submit"
            onClick={login} disabled={credentials}>
            Login
          </button>
        </div>
      </div>
      <div id="createAccount">
        Don't have an account?
        <a id="signUp" href="signUp/names"> Sign up</a>
      </div>
    </div>
  );
}