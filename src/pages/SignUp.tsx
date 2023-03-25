import axios from "axios";
import { FocusEvent, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import "./SignUp.css";

export default function SignUp() {
  const [passwords, setPasswords] = useState(false);
  const navigate = useNavigate();

  document.title = "SignUp to Twitter";

  function click() {
    const firstName = (document.getElementById("firstName") as HTMLInputElement).value;
    const lastName = (document.getElementById("lastName") as HTMLInputElement).value;
    const email = (document.getElementById("mail") as HTMLInputElement).value;
    if (firstName && lastName && email) {
      if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        document.getElementById("stepOne")!.style.display = "none";
        document.getElementById("stepTwo")!.style.display = "block";
        setPasswords(true);
      }
      else {
        alert("Please enter a valid email");
      }
    }
    else {
      alert("Please fill all the fields");
    }
  }

  function back() {
    if (passwords) {
      document.getElementById("stepOne")!.style.display = "block";
      document.getElementById("stepTwo")!.style.display = "none";
      setPasswords(false);
    }
  }

  function focus(e: FocusEvent<HTMLInputElement>) {
    e.target.style.borderBottom = "1px solid #1DA1F2";
  }

  function blur(e: FocusEvent<HTMLInputElement>) {
    e.target.style.borderBottom = "1px solid white";
  }

  function signUp() {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const firstName = (document.getElementById("firstName") as HTMLInputElement).value;
    const lastName = (document.getElementById("lastName") as HTMLInputElement).value;
    const email = (document.getElementById("mail") as HTMLInputElement).value;
    const password1 = (document.getElementById("password1") as HTMLInputElement).value;
    const password2 = (document.getElementById("password2") as HTMLInputElement).value;
    if (username && password1 && password2) {
      if (password1 === password2) {
        const config = {
          method: "post",
          url: "http://65.1.114.106/api/register",
          data: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            username: username,
            password: password1
          }
        };
        axios(config).then(
          (response) => {
            const login = {
              method: "post",
              url: "http://65.1.114.106/api/login",
              data: {
                username: username,
                password: password1
              }
            };
            axios(login)
              .then((response) => {
                sessionStorage.clear();
                sessionStorage.username = username;
                sessionStorage.token = response.data["token"];
                navigate("/users");
              })
              .catch((error) => {
                console.log(error);
              });
          }
        ).catch((error) => console.log(error));
      }
      else {
        alert("Passwords don't match");
      }
    }
  }

  return (
    <div className="signUp">
      <div id="border">
        <div id="backWrapper">
          <AiOutlineArrowLeft onClick={back} style={passwords ? {} : { display: "none" }}
            fontSize="30px" />
        </div>
        <div>
          <img id="logo" src={logo} alt="logo" />
        </div>
        <div id="title">
          SignUp to Twitter
        </div>
        <div id="stepOne">
          Step 1
          <div className="container">
            <input className="input" id="firstName"
              type="text" placeholder="First name" onFocus={focus} onBlur={blur} />
          </div>
          <div className="container">
            <input className="input" id="lastName"
              type="text" placeholder="Last name" onFocus={focus} onBlur={blur} />
          </div>
          <div className="container">
            <input className="input" id="mail"
              type="text" placeholder="Enter eMail" onFocus={focus} onBlur={blur} />
          </div>
          <button className="signUpButton" id="button"
            onClick={click}>
            <AiOutlineArrowRight size="25px" />
          </button>
        </div>
        <div id="stepTwo" style={passwords ? {display: "block"} : {display: "none"}}>
          Step 2
          <div className="container">
            <input className="input" id="username"
              type="text" placeholder="Username" onFocus={focus} onBlur={blur} />
          </div>
          <div className="container">
            <input className="input" id="password1"
              type="password" placeholder="Password" onFocus={focus} onBlur={blur} />
          </div>
          <div className="container">
            <input className="input" id="password2"
              type="password" placeholder="Enter Password again" onFocus={focus} onBlur={blur} />
          </div>
          <button className="signUpButton" type="button" onClick={signUp}>
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
}