import axios from 'axios';
import React, { useState } from 'react';
import { HiArrowLeft } from "react-icons/hi";
import { RiHeartFill, RiHeartLine, RiMessageLine, RiRepeatLine } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import getData from '../Utils';
import Content from './Content.jsx';
import "./Thread.css";

export default function Thread() {
  const { pk } = useParams();
  const [state, setState] = useState({
    firstTime: true,
    data: null,
    parent: null
  });
  const navigate = useNavigate();

  if (state.firstTime) {
    getData(setState, `http://65.1.114.106/api/comment/${pk}`, "thread");
  }

  if (!state.data || !state.parent) {
    return <div></div>
  }

  let content;
  if (state.parent.meta.content_type === "tweet") {
    content = <p className="body">{state.parent.body}</p>;
  }
  else {
    content = <div className="reTweet">
      <div className="contentTop">
        <a className="namesContent" href={`/profile/${state.parent.content.meta.author}`} style={{ cursor: "pointer" }}>
          <b>{state.parent.data.content.meta.author_name}</b>
          <div className="username">@{state.parent.data.meta.author}</div>
        </a>
        <div className="contentAge">- {state.parent.data.content.age}</div>
      </div>
      <a className="reTweetBody" href={`content/${state.parent.data.meta.id}`}>{state.parent.data.content.body}</a>
    </div>;
  }

  function reply() {
    const reply = document.getElementById("newComment").value;
    if (reply.length > 0) {
      const config = {
        method: "post",
        url: "http://65.1.114.106/api/comment/" + state.parent.meta.id,
        data: { body: reply },
        headers: { Authorization: "Token " + sessionStorage.token }
      };

      axios(config).then((response) => {
        document.getElementById("newComment").value = "";
        window.location.reload();
        setState({
          ...state,
          commentCount: state.parent.meta.comment_count + 1
        });
      })
        .catch(error => console.log(error));
    }
    else {
      alert("Comment can't be empty");
    }
  }

  function adjustHeight(e) {
    const element = e.target;
    element.style.height = "1px";
    element.style.height = (element.scrollHeight) + "px";
  }

  function back() {
    navigate(-1);
  }

  function like() {
    const config = {
      method: "put",
      url: "http://65.1.114.106/api",
      headers: {
        Authorization: `Token ${sessionStorage.token}`
      },
      data: { pk: state.parent.meta.id }
    };

    axios(config).then(
      (response) => {
        setState({
          ...state,
          parent: {
            ...state.parent,
            meta: {
              ...state.parent.meta,
              liked_by_user: !state.parent.meta.liked_by_user,
              likes_count: state.parent.meta.liked_by_user ?
                state.parent.meta.likes_count - 1 : state.parent.meta.likes_count + 1
            }
          }
        });
      })
      .catch((error) => console.log(error));
  }

  function reTweet() {
    const config = {
      url: state.parent.meta.retweeted_by_user ?
        `http://0.0.0.0/retweet?pk=${state.parent.meta.id}` : "http://0.0.0.0/retweet",
      method: state.parent.meta.retweeted_by_user ? "delete" : "post",
      headers: { "Authorization": `Token ${sessionStorage.token}` },
      data: { pk: state.parent.meta.id }
    };

    axios(config).then((response) => {
      setState({
        ...state,
        parent: {
          ...state.parent,
          meta: {
            ...state.parent.meta,
            retweeted_by_user: !state.parent.meta.retweeted_by_user,
            retweet_count: state.parent.meta.retweeted_by_user ?
              state.parent.meta.retweet_count - 1 : state.parent.meta.retweet_count + 1
          }
        }
      });
    }).catch((error) => console.log(error.data));
  }

  document.title = `${state.parent.meta.author_name} on Twitter`

  return (
    <div className="wrapper">
      <div className="back" onClick={back}>
        <HiArrowLeft size={"25px"} />
      </div>
      <div id="selectedTweet">
        <b style={{ paddingLeft: "10px" }}>{state.parent.meta.author_name}</b>
        <div className="username" style={{ paddingLeft: "12px", paddingBottom: "10px" }}>@{state.parent.meta.author}</div>
        {content}
        <div className="actions">
          <div className="actionsContent" onClick={like} >
            {state.parent.meta.liked_by_user ? <RiHeartFill size={"20px"} color={"red"} /> :
              <RiHeartLine size="20px" color="gray" />}
            <div>{state.parent.meta.likes_count}</div>
          </div>
          <div className="actionElements" onClick={reTweet}>
            <RiRepeatLine size="20px" color={state.parent.meta.retweeted_by_user ? "green" : "gray"} />
            <div>{state.parent.meta.retweet_count}</div>
          </div>
          <div className="actionsContent">
            <RiMessageLine size="20px" color="gray" />
            <div>{state.parent.meta.comment_count}</div>
          </div>
        </div>
        <div className="createComment">
          <textarea id="newComment" type="text" placeholder="Tweet your reply" defaultValue=""
            onChange={adjustHeight} />
          <button id="replyButton" type="button" onClick={reply}>
            Reply
          </button>
        </div>
        <div>
          {state.data.map((comment, i) => (<Content data={comment} key={i} />))}
        </div>
      </div>
    </div>
  );
}