import axios from "axios";
import { CgHome, CgLogOut, CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import "./LeftNavBar.css";

export default function LeftNavBar() {
  const navigate = useNavigate();

  function openTweetForm() {
    document.getElementById("formPopup").style.display = "block";
  }

  function closeTweetForm() {
    document.getElementById("formPopup").style.display = "none";
  }

  function post() {
    const tweet = document.getElementById("tweetBox").value;

    if (tweet.length > 0) {
      const data = new FormData();
      data.append("body", tweet)

      const config = {
        method: "post",
        url: "http://0.0.0.0",
        data: data,
        headers: { Authorization: "Token " + sessionStorage.token }
      }
      axios(config).then((response) => {
        console.log(response);
        document.getElementById("tweetBox").value = ""
        closeTweetForm();
      })
        .catch(error => console.log(error));
    }
    else {
      alert("Tweet body shoudn't be empty")
    }
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
        <textarea id={"tweetBox"} type={"text"}
          placeholder={"What's happening?"} name={"Tweet"} />
        <br />
        <button id={"post"} type={"button"} onClick={post}>Post</button>
        <br />
        <button id={"buttonClose"} type={"button"} onClick={closeTweetForm}>Close</button>
        <br />
      </div>
    </header>
  )
}