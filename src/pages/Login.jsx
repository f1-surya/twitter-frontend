import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import "./Login.css";

function enableLogin() {
  document.getElementById("button").disabled =
    document.getElementById("userName").value === ""
    && document.getElementById("password").value === "";
}

export default function Login() {
  let navigate = useNavigate();

  const login = () => {
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    const data = new FormData();
    data.append('username', userName);
    data.append('password', password);

    const config = {
      method: "post",
      url: "http://0.0.0.0/login",
      data: data
    };

    if (sessionStorage.token === undefined) {
      axios(config)
        .then((response) => {
          sessionStorage.token = response.data["token"];
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className={"login"}>
      <img id={"logo"} src={logo} alt={"logo"} />
      <div id={"title"}>
        Login to Twitter
      </div>
      <div>Please enter your Username and Password</div>
      <form id={"loginForm"}>
        <div className={"container"}>
          <input id={"userName"} type={"text"} placeholder={"Username"} required={true} />
        </div>
        <div className={"container"}>
          <input id={"password"} type={"text"} placeholder={"Password"} required={true} />
        </div>
        <div className={"container"}>
          <button id={"button"} onKeyUp={enableLogin} type={"button"} onClick={login}>Login</button>
        </div>
      </form>
      <div id={"createAccount"}>
        Don't have an account?
        <a id={"signUp"} href={"signUp"}> Sign up</a>
      </div>
    </div>
  )
}