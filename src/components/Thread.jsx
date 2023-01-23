import axios from 'axios';
import React, { useState } from 'react';
import { RiHeartLine, RiHeartFill, RiMessageLine } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import "./Thread.css";
import Content from './Content.jsx';

export default function Thread() {
  const location = useLocation();
  const tweet = location.state.data;
  const [state, setState] = useState({ firstTime: true, comments: [] });
  if (state.firstTime) {
    const config = {
      method: "get",
      url: "http://0.0.0.0/comment/" + tweet.id,
      headers: {
        Authorization: "Token " + sessionStorage.token
      }
    };

    axios(config)
      .then((response) => {
        setState({ firstTime: false, comments: response.data })
      })
      .catch(error => console.log(error));
  }

  return (
    <div className={"wrapper"}>
      <div id={"selectedTweet"}>
        <b className={"username"}>{tweet.author}</b>
        <div className={"body"}>{tweet.body}</div>
        <div className={"actions"}>
          <div className={"actionsContent"}>
            {tweet.liked_by_user ? <RiHeartFill size={"20px"} color={"red"} /> :
              <RiHeartLine size={"20px"} color={"gray"} />}
            <div>{tweet.likes_count}</div>
          </div>
          <div className={"actionsContent"}>
            <RiMessageLine size={"20px"} color={"gray"} />
            <div>{tweet.comment_count}</div>
          </div>
        </div>
        <div>
          {state.comments.map((comment, i) => (<Content data={comment} key={i} />))}
        </div>
      </div>
    </div>
  );
}