import "./Login.css"
import {useEffect} from "react";
import logo from "../logo.svg"
import axios from "axios";

function enableLogin() {
  document.getElementById("button").disabled =
      document.getElementById("userName").value === ""
      && document.getElementById("password").value === "";
}

export default function Login() {
  useEffect(() => {
    document.title = "Login to Twitter"
  })

  function login() {
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    const credentials = {
      userName: userName,
      password: password
    }
    axios.post("http://localhost:8000/login", credentials).then()
  }
  return (
      <div className={"login"}>
        <img id={"logo"} src={logo} alt={"logo"}/>
        <div id={"title"}>
          Login to Twitter
        </div>
        <div>Please enter your Username and Password</div>
        <form id={"loginForm"}>
          <div className={"container"}>
            <input id={"userName"} type={"text"} placeholder={"Username"} required={true}/>
          </div>
          <div className={"container"}>
            <input id={"password"} type={"text"} placeholder={"Password"} required={true}/>
          </div>
          <div className={"container"}>
            <button id={"button"} onKeyUp={enableLogin} type={"submit"} onClick={login}>Login</button>
          </div>
        </form>
        <div id={"createAccount"}>
          Don't have an account?
          <a id={"signUp"} href={"signUp"}> Sign up</a>
        </div>
      </div>
  )
}