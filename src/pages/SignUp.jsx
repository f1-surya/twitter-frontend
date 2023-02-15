import axios from "axios";
import React, { useEffect, useState } from 'react';
import { AiOutlineArrowRight } from "react-icons/ai";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import "./SignUp.css";

export function Username() {

  const [credentials, setCredentials] = useState(true);

  function handleCredentials() {
    setCredentials(!(!(!document.getElementById("firstName").value) && !(!document.getElementById("lastName").value)
      && !(!document.getElementById("mail").value)));
  }

  const navigate = useNavigate();

  function click() {
    sessionStorage.firstName = document.getElementById("firstName").value;
    sessionStorage.lastName = document.getElementById("lastName").value;
    sessionStorage.mail = document.getElementById("mail").value;
    navigate("/signUp/password");
  }

  return (
    <div>
      Step 1
      <div className="container">
        <input className="input" id="firstName"
          type="text" placeholder="First name"
          onChange={handleCredentials} />
      </div>
      <div className="container">
        <input className="input" id="lastName"
          type="text" placeholder="Last name"
          onChange={handleCredentials} />
      </div>
      <div className="container">
        <input className="input" id="mail"
          type="text" placeholder="Enter eMail"
          onChange={handleCredentials} />
      </div>
      <button className="signUpButton" id="button"
        disabled={credentials} onClick={click}>
        <AiOutlineArrowRight size="25px" />
      </button>
    </div>
  );
}

export function Password() {
  const [credentials, setCredentials] = useState(true);

  function handleCredentials() {
    setCredentials(!(!(!document.getElementById("username").value) && !(!document.getElementById("password1").value)
      && !(!document.getElementById("password2").value)));
  }

  const navigate = useNavigate();

  function signUp() {
    const password1 = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;

    if (password1 === password2) {
      const username = document.getElementById("username").value;
      const config = {
        method: "post",
        url: "http://0.0.0.0/register",
        data: {
          first_name: sessionStorage.firstName,
          last_name: sessionStorage.lastName,
          email: sessionStorage.mail,
          username: username,
          password: password1
        }
      };
      axios(config).then(
        (response) => {
          const login = {
            method: "post",
            url: "http://0.0.0.0/login",
            data: {
              username: username,
              password: password1
            }
          };
          axios(login)
            .then((response) => {
              sessionStorage.clear()
              sessionStorage.token = response.data["token"];
              navigate('/');
            })
            .catch((error) => {
              console.log(error);
            });
        }
      ).catch((error) => console.log(error));
    }
    else {
      alert("Passwords don't match")
    }
  }

  return (
    <div>
      Step 2
      <div className="container">
        <input className="input" id="username"
          type="text" onChange={handleCredentials}
          placeholder="Username" />
      </div>
      <div className="container">
        <input className="input" id="password1"
          type="password" onChange={handleCredentials}
          placeholder="Password" />
      </div>
      <div className="container">
        <input className="input" id="password2"
          type="password" onChange={handleCredentials}
          placeholder="Enter Password again" />
      </div>
      <div className="container">
        <button className="signUpButton" disabled={credentials}
          type="button" onClick={signUp}>
          SignUp
        </button>
      </div>
    </div>
  )
}


export function SignUp() {
  useEffect(() => {
    document.title = "SignUp to Twitter"
  });

  return (
    <div className="signUp">
      <div id="border">
        <div>
          <img id="logo" src={logo} alt="logo" />
        </div>
        <div id="title">
          SignUp to Twitter
        </div>
        <Outlet />
      </div>
    </div>
  );
}