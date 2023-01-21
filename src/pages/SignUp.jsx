import { useEffect } from "react";
import logo from "../logo.svg";
import "./SignUp.css"
import axios from "axios";

function enableLogin() {
  document.getElementById("button").disabled =
    document.getElementById("userName").value === ""
    && document.getElementById("password").value === "";
}

export default function SignUp() {
  useEffect(() => {
    document.title = "SignUp to Twitter"
  })

  async function signUp() {
    const username = document.getElementById("userName").value;
    const mail = document.getElementById("email").value;
    const password1 = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;
    const data = new FormData();

    if (password1 === password2) {
      data.append("username", username);
      data.append("email", mail);
      data.append("password", password1);

      await axios.post("http://127.0.0.1:8000/register", data).then((res) => {
        console.log(res.status);
        console.log(res.data);
      })
    }
  }

  return (
    <div className={"signUp"}>
      <img id={"logo"} src={logo} alt={"logo"} />
      <div id={"title"}>
        SignUp to Twitter
      </div>
      <form id={"signUpForm"}>
        <div className={"container"}>
          <input id={"userName"} type={"text"} placeholder={"Username"} required={true} />
        </div>
        <div className={"container"}>
          <input id={"email"} type={"text"} placeholder={"Enter eMail"} required={true} />
        </div>
        <div className={"container"}>
          <input className={"password"} id={"password1"} type={"text"} placeholder={"Password"} required={true} />
        </div>
        <div className={"container"}>
          <input className={"password"} id={"password2"} type={"text"} placeholder={"Enter Password again"}
            required={true} />
        </div>
        <div className={"container"}>
          <button id={"button"} onKeyUp={enableLogin} type={"button"} onClick={signUp}>SignUp</button>
        </div>
      </form>
    </div>
  )
}