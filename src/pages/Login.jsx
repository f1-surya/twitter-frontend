import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import "./Login.css";

export default function Login() {
  let navigate = useNavigate();

  function login() {
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    if (userName && password) {
      sessionStorage.username = userName;
      const config = {
        method: "post",
        url: "http://65.1.114.106/api/login",
        data: {
          username: userName,
          password: password
        }
      };

      axios(config)
        .then((response) => {
          sessionStorage.token = response.data["token"];
          navigate("/");
        })
        .catch((error) => {
          console.log(error.data);
        });
    }
    else {
      alert("Please fill all the fields");
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
            type="text" placeholder="Username" />
        </div>
        <div id="container">
          <input className="loginCredentials" id="password"
            type="password" placeholder="Password" />
        </div>
        <div id="container">
          <button className="button" type="submit"
            onClick={login}>
            Login
          </button>
        </div>
      </div>
      <div id="createAccount">Don&apos;t have an account?
        <a id="signUp" href="signUp"> Sign up</a>
      </div>
    </div>
  );
}