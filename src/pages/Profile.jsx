import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import Content from "../components/Content";
import { fetchData } from "../Utils.js";
import "./Profile.css";

export default function Profile() {
  const [state, setState] = useState({ firstTime: true, profile: {}, content: [] });
  const { user } = useParams();
  const self = user === sessionStorage.username;
  const navigate = useNavigate();

  useEffect(() => {
    if (state.firstTime) {
      const button = document.getElementById("multiButton");
      if (self) {
        const url = `http://0.0.0.0/profile/tweets/${sessionStorage.username}`;
        fetchData(url, setState, true);
        button.innerHTML = "Edit";
        button.style.backgroundColor = "inherit";
        button.style.border = "2px solid white";
        button.style.color = "white";
      }
      else {
        const url = `http://0.0.0.0/profile/tweets/${user}`;
        fetchData(url, setState, true);
      }
    }
  }, [self, state, user]
  );

  function action() {
    console.log("action");
    if (!self) {
      console.log("if");
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
        const url = `http://0.0.0.0/profile/tweets/${sessionStorage.username}`;
        fetchData(url, setState, true);
      })
    }
  }

  function getLikes() {
    let url = `http://0.0.0.0/profile/likes/${user}`;
    if (self) {
      url = `http://0.0.0.0/profile/likes/${sessionStorage.username}`;
    }

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
    </main>
  );
}