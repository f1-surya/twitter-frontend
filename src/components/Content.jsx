import axios from "axios";
import { useState } from "react";
import { RiHeartFill, RiHeartLine, RiMessageLine, RiRepeatLine } from "react-icons/ri";
import { contentAge } from "../Utils";
import "./Content.css";

export default function Content(props) {
  const [state, setState] = useState({ firstTime: true });
  if (state.firstTime) {
    setState({
      firstTime: false,
      likedByUser: props.data.meta.liked_by_user,
      likesCount: props.data.meta.likes_count,
      retweetedByUser: props.data.meta.retweeted_by_user,
      retweetCount: props.data.meta.retweet_count
    });
  }
  if (props.data.meta.content_type === "retweet") {
    contentAge(props.data.content);
  }
  if (props.data.meta.content_type === "comment") {
    contentAge(props.data);
  }

  let content;
  if (props.data.meta.content_type === "retweet") {
    content = <div className="reTweet">
      <div className="contentTop">
        <a className="namesContent" href={`/profile/${props.data.content.meta.author}`} style={{ cursor: "pointer" }}>
          <b>{props.data.content.meta.author_name}</b>
          <div className="username">@{props.data.meta.author}</div>
        </a>
        <div className="contentAge">- {props.data.content.age}</div>
      </div>
      <a className="reTweetBody" href={`content/${props.data.content.meta.id}`}>{props.data.content.body}</a>
    </div>;
  }
  else {
    content = <a className="body" href={`content/${props.data.meta.id}`}>{props.data.body}</a>;
  }

  let style;
  if (props.first) {
    style = {
      height: "90%",
    };
  }
  else {
    style = {
      height: "100%"
    };
  }

  let line;
  if (props.last) {
    line = <div className="lineContainer" style={props.thread ? {} : { display: "none" }}>
      <div className="line" style={!props.last ? style : {}}></div>
      <div className="circle"></div>
    </div>;
  }
  else {
    line = <div className="lineContainer" style={props.thread ? {} : { display: "none" }}>
      <div className="circle" style={props.first ? { marginTop: "15px" } : { display: "none" }}></div>
      <div className="line" style={!props.last ? style : {}}></div>
    </div>;
  }

  function like() {
    const config = {
      method: "put",
      url: "http://0.0.0.0",
      headers: {
        Authorization: `Token ${sessionStorage.token}`
      },
      data: { pk: props.data.meta.id }
    };

    axios(config).then(
      (response) => {
        setState({
          ...state,
          likedByUser: !state.likedByUser,
          likesCount: state.likedByUser ? state.likesCount - 1 : state.likesCount + 1
        })
      })
      .catch(
        (error) => {
          console.log(error);
        });
  }

  function reTweet() {
    const config = {
      url: state.retweetedByUser ? `http://0.0.0.0/retweet?pk=${props.data.meta.id}` : "http://0.0.0.0/retweet",
      method: state.retweetedByUser ? "delete" : "post",
      headers: { "Authorization": `Token ${sessionStorage.token}` },
      data: { pk: props.data.meta.id }
    };

    axios(config).then((response) => {
      setState({
        ...state,
        retweetedByUser: !props.data.meta.retweeted_by_user,
        retweetCount: state.retweetedByUser ?
          props.data.meta.retweet_count - 1 : props.data.meta.retweet_count + 1
      });
    }).catch((error) => { console.log(error.data); });
  }

  return (
    <div className="content" style={props.thread && !props.last ? { borderBottom: "none" } : {}}>
      {line}
      <div className="contentContainer">
        <div className="top">
          <a className="namesContent" href={`/profile/${props.data.meta.author}`}>
            <b>{props.data.meta.author_name}</b>
            <div className="username">@{props.data.meta.author}</div>
          </a>
          <div className="contentAge">- {props.data.age}</div>
        </div>
        {content}
        <div id="actions">
          <div className="actionElements" onClick={like}>
            {state.likedByUser ? <RiHeartFill size="20px" color="red" />
              : <RiHeartLine size="20px" color="gray" />}
            <div>{state.likesCount}</div>
          </div>
          <div className="actionElements" onClick={reTweet}>
            <RiRepeatLine size="20px" color={state.retweetedByUser ? "green" : "gray"} />
            <div>{state.retweetCount}</div>
          </div>
          <div className="actionElements">
            <RiMessageLine size="20px" color="gray" />
            <div>{props.data.meta.comment_count}</div>
          </div>
        </div>
      </div>
    </div>
  );
}