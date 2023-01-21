import axios from "axios";
import { CgHome, CgLogOut, CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import "./LeftNavBar.css";

function openTweetForm() {
  document.getElementById("formPopup").style.display = "block";
}

function closeTweetForm() {
  document.getElementById("formPopup").style.display = "none";
}

function enablePost() {
  document.getElementById("post").disabled = document.getElementById("tweet").value === "";
}

export default function LeftNavBar() {
  const navigate = useNavigate();

  function post() {
    const tweet = document.getElementById("tweetBox").value;

    const config = {
      method: "post",
      url: "http://0.0.0.0",
      data: { tweet: tweet },
      headers: { Authorization: "Token " + sessionStorage.token }
    }
    axios(config).then(response => console.log(response)).catch(error => console.log(error));
  }

  function logout() {
    const config = {
      method: "post",
      url: "http://0.0.0.0/logout",
      headers: {
        Authorization: "Token " + sessionStorage.token
      }
    };

    axios(config)
      .then((response) => {
        sessionStorage.clear("token");
        navigate("/login")
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <header className={"layout"} id={"leftNavBar"}>
      <img src={logo} alt={"Logo"} />
      <div className={"navBox"}>
        <a className={"navDestiny"} href={"/"}>
          <CgHome size={"22px"} />
          <b className={"routes"}>Home</b>
        </a>
        <a className={"navDestiny"} href={"/profile"}>
          <CgProfile size={"23px"} />
          <b className={"routes"}>Profile</b>
        </a>
        <div className={"logout"} onClick={logout}>
          <CgLogOut size={"23px"} />
          <b className={"routes"}>LogOut</b>
        </div>
      </div>
      <button id={"tweetButton"} type={"button"} onClick={openTweetForm}>Tweet</button>
      <div id={"formPopup"}>
        <form id={"tweetForm"}>
          <textarea id={"tweetBox"} type={"text"} placeholder={"What's happening?"} name={"Tweet"} required={true} /><br />
          <button type={"button"} id={"post"} onKeyUp={enablePost} onClick={post}>Post</button>
          <br />
          <button type={"button"} id={"buttonClose"} onClick={closeTweetForm}>Close</button>
          <br />
        </form>
      </div>
    </header>
  )
}