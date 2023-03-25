import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiArrowLeft } from "react-icons/hi";
import { useParams } from "react-router-dom";
import Content from "../components/Content";
import { fetchData } from "../Utils";
import Follow from "./Follow";
import "./Profile.css";

function reducer(state, action) {
  switch (action.type) {
    case "firstName":
      return {
        ...state,
        firstName: action.newValue
      };
    case "lastName":
      return {
        ...state,
        lastName: action.newValue
      };
    case "about":
      return {
        ...state,
        about: action.newValue
      };
    default:
      return action.state;
  }
}

export default function Profile() {
  const [state, setState] = useState({ firstTime: true, profile: {}, content: [] });
  const [edit, dispatch] = useReducer(reducer, { firstName: "", lastName: "", about: "", });
  const { user, query } = useParams();
  const self = user === sessionStorage.username;
  const back = () => window.history.back();
  const handleInput = (event) => dispatch({ type: event.target.id, newValue: event.target.value });
  const closeEdit = () => document.getElementById("edit").style.display = "none";

  if (query === "followers" || query === "following") {
    return <Follow user={user} type={query} />;
  }

  useEffect(() => {
    switch (query) {
      case "tweets":
        document.getElementById("tweets").style.borderBottom = "5px solid #1DA1F2";
        break;
      case "retweets":
        document.getElementById("retweets").style.borderBottom = "5px solid #1DA1F2";
        break;
      default:
        document.getElementById("likes").style.borderBottom = "5px solid #1DA1F2";
        break;
    }

    if (state.firstTime) {
      const button = document.getElementById("multiButton");
      if (self) {
        const url = `http://65.1.114.106/api/profile?query=${query}&username=${sessionStorage.username}`;
        fetchData(url, setState, query);
        button.innerHTML = "Edit";
        button.style.backgroundColor = "inherit";
        button.style.border = "2px solid white";
        button.style.color = "white";
      }
      else {
        const url = `http://65.1.114.106/api/profile?query=${query}&username=${user}`;
        fetchData(url, setState, query);
      }
    }
    else {
      dispatch({
        type: "firstTime",
        state: {
          firstName: state.profile.full_name.split(" ")[0],
          lastName: state.profile.full_name.split(" ")[1],
          about: state.profile.about
        }
      });
    }
  }, [self, state, user, dispatch, query]
  );

  function action() {
    if (!self) {
      const config = {
        url: "http://65.1.114.106/api/profile",
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
        setState(
          {
            ...state,
            profile: {
              ...state.profile,
              followed_by_user: !state.profile.followed_by_user,
              followers_count: state.profile.followed_by_user ? state.profile.followers_count - 1 :
                state.profile.followers_count + 1
            }
          }
        );
      });
    }
    else {
      document.getElementById("edit").style.display = "block";
    }
  }

  const style = {
    backgroundColor: "inherit",
    border: "2px solid white",
    color: "white"
  };


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
      url: "http://65.1.114.106/api/profile",
      headers: {
        Authorization: `Token ${sessionStorage.token}`
      }
    };
    const data = {
      query: "edit",
      edit_first_name: "false",
      edit_last_name: "false",
      edit_about: "false"
    };

    const firstNameChanged = edit.firstName !== state.profile.full_name.split(" ")[0];
    const lastNameChanged = edit.lastName !== state.profile.full_name.split(" ")[1];
    const aboutChanged = edit.about !== state.profile.about;

    if (firstNameChanged) {
      data.edit_first_name = "true";
      data.first_name = edit.firstName;
    }
    if (lastNameChanged) {
      data.edit_last_name = "true";
      data.last_name = edit.lastName;
    }
    if (aboutChanged) {
      data.edit_about = "true";
      data.about = edit.about;
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
        <a className="category" id="tweets" href={`/profile/${user}/tweets`}>
          Tweets
        </a>
        <a className="category" id="retweets" href={`/profile/${user}/retweets`}>
          Retweets
        </a>
        <a className="category" id="likes" href={`/profile/${user}/likes`}>
          Likes
        </a>
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
              type="text" onChange={handleInput} value={edit.firstName}
              onFocus={focus} onBlur={blur} />
          </div>
          <div className="inputWrapper" id="lastNameWrapper">
            <label htmlFor="lastName" className="label">
              Lastname
            </label>
            <input className="editFields" id="lastName"
              type="text" onChange={handleInput} value={edit.lastName}
              onFocus={focus} onBlur={blur} />
          </div>
          <div className="inputWrapper" id="aboutWrapper">
            <label htmlFor="about" className="label">
              About
            </label>
            <input className="editFields" type="text" id="about"
              onChange={handleInput} value={edit.about} maxLength="150"
              onFocus={focus} onBlur={blur} />
          </div>
        </div>
      </div>
    </main>
  );
}