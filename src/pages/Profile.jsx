import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import Content from "../components/Content";
import { fetchData } from "../Utils.js";
import "./Profile.css";

export default function Profile() {
  const [state, setState] = useState({ firstTime: true, profile: {}, content: [] });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const { user } = useParams();
  const self = user === sessionStorage.username;
  const navigate = useNavigate();

  useEffect(() => {
    if (state.firstTime) {
      const button = document.getElementById("multiButton");
      if (self) {
        const url = `http://0.0.0.0/profile?query=tweets&username=${sessionStorage.username}`;
        fetchData(url, setState, true);
        button.innerHTML = "Edit";
        button.style.backgroundColor = "inherit";
        button.style.border = "2px solid white";
        button.style.color = "white";
      }
      else {
        const url = `http://0.0.0.0/profile?query=tweets&username=${user}`;
        fetchData(url, setState, true);
      }
    }
    else {
      setFirstName(state.profile.full_name.split(" ")[0]);
      setLastName(state.profile.full_name.split(" ")[1]);
      setAbout(state.profile.about);
    }
  }, [self, state, user]
  );

  function action() {
    if (!self) {
      const config = {
        url: "http://0.0.0.0/profile",
        method: "put",
        headers: {
          Authorization: `Token ${sessionStorage.token}`
        },
        data: {
          query: "follow",
          username: state.profile.user
        }
      };
      axios(config).then((response) => {
        const url = `http://0.0.0.0/profile?query=tweets&username=${user}`;
        fetchData(url, setState, true);
      })
    }
    else {
      document.getElementById("edit").style.display = "block";
    }
  }

  function getLikes() {
    const url = `http://0.0.0.0/profile?query=likes&username=${user}`;

    fetchData(url, setState, false);
    document.getElementById("tweets").style.borderBottom = "none";
    document.getElementById("likes").style.borderBottom = "5px solid #1DA1F2";
  }

  function tweets() {
    window.location.reload();
  }

  const style = {
    backgroundColor: "inherit",
    border: "2px solid white",
    color: "white"
  }

  function back() {
    navigate("/");
  }

  function handleInput(event) {
    if (event.target.id === "firstName") {
      setFirstName(event.target.value);
    }
    else if (event.target.id === "about") {
      setAbout(event.target.value);
    }
    else {
      setLastName(event.target.value);
    }
  }

  function closeEdit() {
    document.getElementById("edit").style.display = "none";
  }

  function focus(event) {
    if (event.target.id === "firstName") {
      document.getElementById("firstNameWrapper").style.border = "1px solid #1DA1F2";
    }
    else if (event.target.id === "lastName") {
      document.getElementById("lastNameWrapper").style.border = "1px solid #1DA1F2";
    }
    else {
      document.getElementById("aboutWrapper").style.border = "1px solid #1DA1F2";
    }
  }

  function blur(event) {
    if (event.target.id === "firstName") {
      document.getElementById("firstNameWrapper").style.border = "1px solid gray";
    }
    else if (event.target.id === "lastName") {
      document.getElementById("lastNameWrapper").style.border = "1px solid gray";
    }
    else {
      document.getElementById("aboutWrapper").style.border = "1px solid gray";
    }
  }

  function save() {
    const config = {
      method: "put",
      url: "http://0.0.0.0/profile",
      headers: {
        Authorization: `Token ${sessionStorage.token}`
      }
    };
    const data = {
      query: "edit",
      edit_first_name: "false",
      edit_last_name: "false",
      edit_about: "false"
    }

    const firstNameChanged = firstName !== state.profile.full_name.split(" ")[0];
    const lastNameChanged = lastName !== state.profile.full_name.split(" ")[1];
    const aboutChanged = about !== state.profile.about;

    if (firstNameChanged) {
      data.edit_first_name = "true";
      data.first_name = firstName;
    }
    if (lastNameChanged) {
      data.edit_last_name = "true";
      data.last_name = lastName;
    }
    if (aboutChanged) {
      data.edit_about = "true";
      data.about = about;
    }
    config.data = data;

    if (firstNameChanged || lastNameChanged || aboutChanged) {
      axios(config).then(
        (response) => {
          console.log(response);
          closeEdit();
          window.location.reload();
        })
        .catch((error) => { console.log(error); });
    }
  }

  document.title = state.profile.full_name;

  return (
    <main>
      <div className="back" onClick={back}>
        <HiArrowLeft size={"25px"} />
      </div>
      <div className="user">
        <div className="names">
          <b className="fullName">{state.profile.full_name}</b>
          <div className="username">
            @{state.profile.user}
          </div>
        </div>
        <div className="about">{state.profile.about}</div>
        <div className="follows">
          <a className="followsTiles" id="followingCount" href={`/profile/${user}/following`}>
            <div className="numbers">{state.profile.following_count}</div>
            Following
          </a>
          <a className="followsTiles" href={`/profile/${user}/followers`}>
            <div className="numbers">{state.profile.followers_count}</div>
            Followers
          </a>
        </div>
        <button className="Button" id="multiButton" type="button" onClick={action}
          style={state.profile.followed_by_user ? style : {}}>
          {self ? "Edit profile" : state.profile.followed_by_user ? "Unfollow" : "Follow"}
        </button>
      </div>
      <div className="categories">
        <div className="category" id="tweets" onClick={tweets}
          style={{ borderBottom: "5px solid #1DA1F2" }}>
          Tweets
        </div>
        <div className="category" id="likes" onClick={getLikes}>
          Likes
        </div>
      </div>
      <div>
        {state.content.map((content, i) => <Content data={content} key={i} />)}
      </div>
      <div id="edit">
        <div id="actionBar">
          <div id="close" onClick={closeEdit}>
            <AiOutlineClose size={"20px"} />
          </div>
          <b>Edit profile</b>
          <button id="saveButton" onClick={save}><b>Save</b></button>
        </div>
        <div className="editOptions">
          <div className="inputWrapper" id="firstNameWrapper">
            <label htmlFor="firstName" className="label">
              Firstname
            </label>
            <input className="editFields" id="firstName"
              type="text" onChange={handleInput} value={firstName}
              onFocus={focus} onBlur={blur} />
          </div>
          <div className="inputWrapper" id="lastNameWrapper">
            <label htmlFor="lastName" className="label">
              Lastname
            </label>
            <input className="editFields" id="lastName"
              type="text" onChange={handleInput} value={lastName}
              onFocus={focus} onBlur={blur} />
          </div>
          <div className="inputWrapper" id="aboutWrapper">
            <label htmlFor="about" className="label">
              About
            </label>
            <input className="editFields" type="text" id="about"
              onChange={handleInput} value={about} maxLength="150"
              onFocus={focus} onBlur={blur} />
          </div>
        </div>
      </div>
    </main>
  );
}