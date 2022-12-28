import "./LeftNavBar.css";
import {AiFillBell} from "react-icons/ai";
import {CgHome, CgProfile} from "react-icons/cg";
import logo from "../logo.svg";
import axios from "axios";

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

  function post() {
    const tweet = document.getElementById("tweetBox").value;
    axios.post("http://localhost:8000/tweet", {tweet: tweet}).then()
  }

  return (
      <header className={"layout"} id={"leftNavBar"}>
        <img src={logo} alt={"Logo"}/>
        <div className={"navBox"}>
          <a className={"navDestiny"} href={"/"}>
            <div className={"logoButton"}><CgHome size={"25px"}/></div>
            <div className={"logoButton"}><b className={"routes"}>Home</b></div>
          </a>
          <a className={"navDestiny"} href={"/"}>
            <div className={"logoButton"}><AiFillBell size={"25px"} className={"bell"}/></div>
            <div className={"logoButton"}><b className={"routes"}>Notifications</b></div>
          </a>
          <a className={"navDestiny"} href={"/profile"}>
            <div className={"logoButton"}><CgProfile size={"25px"}/></div>
            <div className={"logoButton"}><b className={"routes"}>Profile</b></div>
          </a>
        </div>
        <button id={"tweetButton"} type={"button"} onClick={openTweetForm}>Tweet</button>
        <div id={"formPopup"}>
          <form id={"tweetForm"}>
            <input id={"tweetBox"} type={"text"} placeholder={"What's happening?"} name={"Tweet"} required={true}/><br/>
            <button type={"submit"} id={"post"} onKeyUp={enablePost} onClick={post}>Post</button>
            <br/>
            <button type={"button"} id={"buttonClose"} onClick={closeTweetForm}>Close</button>
            <br/>
          </form>
        </div>
      </header>
  )
}