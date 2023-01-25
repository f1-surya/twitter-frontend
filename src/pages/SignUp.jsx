import { useEffect } from "react";
import logo from "../logo.svg";
import "./SignUp.css"
import axios from "axios";
import { useState } from "react";

export default function SignUp() {
  useEffect(() => {
    document.title = "SignUp to Twitter"
  })

  const [credentials, setCredentials] = useState(true);

  function handleCredentials(e) {
    setCredentials(!(!(!document.getElementById("username").value) && !(!document.getElementById("mail").value)
      && !(!document.getElementById("password1").value) && !(!document.getElementById("password2").value)));
  }

  async function signUp() {
    const username = document.getElementById("username").value;
    const mail = document.getElementById("mail").value;
    const password1 = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;
    const data = new FormData();

    if (password1 === password2) {
      data.append("username", username);
      data.append("email", mail);
      data.append("password", password1);

      await axios.post("http://0.0.0.0/register", data).then((res) => {
        console.log(res.status);
        console.log(res.data);
      })
    }
  }

  return (
    <div className={"signUp"}>
      <div>
        <img id={"logo"} src={logo} alt={"logo"} />
      </div>
      <div id={"title"}>
        SignUp to Twitter
      </div>
      <div className={"container"}>
        <input className={"input"} id={"username"}
          type={"text"} onChange={handleCredentials}
          placeholder={"Username"} />
      </div>
      <div className={"container"}>
        <input className={"input"} id={"mail"}
          type={"text"} onChange={handleCredentials}
          placeholder={"Enter eMail"} />
      </div>
      <div className={"container"}>
        <input className={"input"} id={"password1"}
          type={"password"} onChange={handleCredentials}
          placeholder={"Password"} />
      </div>
      <div className={"container"}>
        <input className={"input"} id={"password2"}
          type={"password"} onChange={handleCredentials}
          placeholder={"Enter Password again"} />
      </div>
      <div className={"container"}>
        <button id={"button"} disabled={credentials}
          type={"button"} onClick={signUp}>
          SignUp
        </button>
      </div>
    </div>
  );
}