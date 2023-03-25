import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { CgHome, CgLogOut, CgProfile, CgSearch } from "react-icons/cg";
import { MdOutlineCreate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import "./NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();
  const openTweetForm = () => document.getElementById("formPopup").style.display = "flex";
  const closeTweetForm = () => document.getElementById("formPopup").style.display = "none";

  function post() {
    const tweet = document.getElementById("tweetBox").value;

    if (tweet.length > 0) {
      const config = {
        method: "post",
        url: "http://65.1.114.106/api/tweets",
        data: { body: tweet },
        headers: { Authorization: "Token " + sessionStorage.token }
      };
      axios(config).then((response) => {
        document.getElementById("tweetBox").value = "";
        closeTweetForm();
      })
        .catch(error => console.log(error));
    }
    else {
      alert("Tweet body shoudn't be empty");
    }
  }

  function logout() {
    const config = {
      method: "post",
      url: "http://65.1.114.106/api/logout",
      headers: {
        Authorization: "Token " + sessionStorage.token
      }
    };

    axios(config)
      .then((response) => {
        sessionStorage.clear("token");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function adjustHeight(e) {
    const element = e.target;
    element.style.height = "1px";
    element.style.height = (element.scrollHeight) + "px";
  }

  return (
    <header className="navBar">
      <div className="navLogo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="navBox">
        <a className="navDestiny" href="/">
          <CgHome size="24px" />
          <b className="routes">Home</b>
        </a>
        <a className="navDestiny" href={`/profile/${sessionStorage.username}/tweets`}>
          <CgProfile size="25px" />
          <b className="routes">Profile</b>
        </a>
        <a className="navDestiny" href="/search" id="search">
          <CgSearch size="25px" />
        </a>
        <div className="navDestiny" onClick={logout}>
          <CgLogOut size="25px" />
          <b className="routes">LogOut</b>
        </div>
      </div>
      <button id="tweetButton" type="button" onClick={openTweetForm}>
        <MdOutlineCreate className="create" />
        <span className="createTweet">Tweet</span>
      </button>
      <div id="formPopup">
        <div className="buttons">
          <button id="buttonClose" type="button" onClick={closeTweetForm}>
            <AiOutlineClose size="25px" />
          </button>
        </div>
        <textarea id="tweetBox" type="text"
          placeholder="What's happening?" name="Tweet"
          onChange={adjustHeight} />
        <div style={{display: "flex", justifyContent: "flex-end", width: "90%", padding: "10px"}}>
          <button id="post" type="button" onClick={post}>Tweet</button>
        </div>
      </div>
    </header>
  );
}