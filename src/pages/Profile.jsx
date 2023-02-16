import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Content from "../components/Content";
import { fetchData } from "../Utils.js";
import "./Profile.css";

export default function Profile() {
  const location = useLocation();
  const [state, setState] = useState({ firstTime: true, profile: {}, content: [] });
  const self = location.state.self || location.state.username === sessionStorage.username;

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
        const url = `http://0.0.0.0/profile/tweets/${location.state.username}`;
        fetchData(url, setState, true);
      }
    }
  }, [self, location, state]
  );

  function action() {
    console.log("action");
    if (!location.state.self) {
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
        const url = `http://0.0.0.0/profile/tweets/${location.state.username}`;
        fetchData(url, setState, true);
      })
    }
  }

  function getLikes() {
    let url = `http://0.0.0.0/profile/likes/${location.state.username}`;
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

  return (
    <main>
      <div className="user">
        <div className="names">
          <b className="fullName">{state.profile.full_name}</b>
          <div>
            @{state.profile.user}
          </div>
        </div>
        <div className="about">{state.profile.about}</div>
        <div className="follows">
          <div className="following">
            <div className="numbers">{state.profile.following_count}</div>
            Following
          </div>
          <div className="followers">
            <div className="numbers">{state.profile.followers_count}</div>
            Followers
          </div>
        </div>
        <button className="Button" id="multiButton" type="button" onClick={action}
          style={state.profile.followed_by_user ? style : {}}>
          {self ? "Edit profile" : state.profile.followed_by_user ? "Unfollow" : "Follow"}
        </button>
      </div>
      <div className="categories">
        <span className="category" id="tweets" onClick={tweets}
          style={{borderBottom: "5px solid #1DA1F2"}}>
          Tweets
        </span>
        <span className="category" id="likes" onClick={getLikes}>
          Likes
        </span>
      </div>
      {state.content.map((content, i) => <Content data={content} key={i} />)}
    </main>
  );
}