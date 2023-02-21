import axios from 'axios';
import React, { useState } from 'react';
import { RiHeartFill, RiHeartLine, RiMessageLine } from 'react-icons/ri';
import {HiArrowLeft} from "react-icons/hi";
import { useLocation, useNavigate } from 'react-router-dom';
import getData from '../Utils';
import Content from './Content.jsx';
import "./Thread.css";

export default function Thread() {
  const location = useLocation();
  const tweet = location.state.data;
  const [commentCount, setCommentCount] = useState(tweet.comment_count);
  const [state, setState] = useState({ firstTime: true, data: [] });
  const navigate = useNavigate();

  if (state.firstTime) {
    getData(setState, "http://0.0.0.0/comment/" + tweet.id);
  }

  function reply() {
    const reply = document.getElementById("newComment").value;
    if (reply.length > 0) {
      const config = {
        method: "post",
        url: "http://0.0.0.0/comment/" + tweet.id,
        data: { body: reply },
        headers: { Authorization: "Token " + sessionStorage.token }
      };

      axios(config).then((response) => {
        document.getElementById("newComment").value = "";
        getData();
        setCommentCount(commentCount + 1);
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

  document.title = `${tweet.author_name} on Twitter`

  return (
    <div className="wrapper">
      <div className="back" onClick={back}>
        <HiArrowLeft size={"25px"} />
      </div>
      <div id="selectedTweet">
        <b style={{ paddingLeft: "10px" }}>{tweet.author_name}</b>
        <div className="username" style={{ paddingLeft: "12px", paddingBottom: "10px" }}>@{tweet.author}</div>
        <div className="body">{tweet.body}</div>
        <div className="actions">
          <div className="actionsContent">
            {tweet.liked_by_user ? <RiHeartFill size={"20px"} color={"red"} /> :
              <RiHeartLine size="20px" color="gray" />}
            <div>{tweet.likes_count}</div>
          </div>
          <div className="actionsContent">
            <RiMessageLine size="20px" color="gray" />
            <div>{commentCount}</div>
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