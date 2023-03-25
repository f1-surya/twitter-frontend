import axios from "axios";
import { useState } from "react";
import { RiHeartFill, RiHeartLine, RiMessageLine, RiRepeatLine } from "react-icons/ri";
import { contentAge } from "../Utils";
import "./ThreadTop.css";

export default function ThreadTop(props: any) {
  const [state, setState] = useState(props.data);
  let content: JSX.Element;

  content = <p className="parentBody">{state.body}</p>;

  if (state.meta.content_type === "retweet") {
    contentAge(state.content);
    content = <div className="reTweet" style={{ marginBottom: "5px" }}>
      <div className="contentTop">
        <a className="namesContent" href={`/profile/${state.content.meta.author}/tweet`}
          style={{ cursor: "pointer" }}>
          <b className="authorName">{state.content.meta.author_name}</b>
          <div className="username">@{state.content.meta.author}</div>
        </a>
        <div className="contentAge">- {state.content.age}</div>
      </div>
      <a className="reTweetBody" href={`content/${state.meta.id}`}>{state.content.body}</a>
    </div>;
  }

  const date = new Date(state.meta.posted_date);

  function like() {
    const config = {
      method: "put",
      url: "http://65.1.114.106/api",
      headers: {
        Authorization: `Token ${sessionStorage.token}`
      },
      data: { pk: state.meta.id }
    };

    axios(config).then(
      (response) => {
        setState({
          ...state,
          parent: {
            ...state,
            meta: {
              ...state.meta,
              liked_by_user: !state.meta.liked_by_user,
              likes_count: state.meta.liked_by_user
                ? state.meta.likes_count - 1
                : state.meta.likes_count + 1
            }
          }
        });
      })
      .catch((error) => { console.log(error); });
  }

  function reTweet() {
    const config = {
      url: state.meta.retweeted_by_user
        ? `http://0.0.0.0/retweet?pk=${state.meta.id}`
        : "http://0.0.0.0/retweet",
      method: state.meta.retweeted_by_user ? "delete" : "post",
      headers: { Authorization: `Token ${sessionStorage.token}` },
      data: { pk: state.meta.id }
    };

    axios(config).then((response) => {
      setState({
        ...state,
        parent: {
          ...state,
          meta: {
            ...state.meta,
            retweeted_by_user: !state.meta.retweeted_by_user,
            retweet_count: state.meta.retweeted_by_user
              ? state.meta.retweet_count - 1
              : state.meta.retweet_count + 1
          }
        }
      });
    }).catch((error) => { console.log(error.data); });
  }

  return (
    <div id="selectedTweet">
      <a href={`/profile/${state.meta.author}/tweets`}>
        <b style={{ paddingLeft: "10px" }}>{state.meta.author_name}</b>
        <div className="username" style={{ paddingLeft: "12px", paddingBottom: "10px" }}>
          @{state.meta.author}
        </div>
      </a>
      <span className="replyingTo" style={state.meta.content_type === "comment" ? {} : { display: "none" }}>
        Replying to <a className="replyingToUsername" href={`/profile/${props.parentUsername}/tweet`}>
          @{props.parentUsername}
        </a>
      </span>
      {content}
      <div className="date">{date.toDateString()}:{date.toLocaleTimeString()}</div>
      <div className="actions">
        <div className="actionsContent" onClick={like} >
          {state.meta.liked_by_user
            ? <RiHeartFill size={"20px"} color={"red"} />
            : <RiHeartLine size="20px" color="gray" />}
          <div>{state.meta.likes_count}</div>
        </div>
        <div className="actionElements" onClick={reTweet}>
          <RiRepeatLine size="20px" color={state.meta.retweeted_by_user ? "green" : "gray"} />
          <div>{state.meta.retweet_count}</div>
        </div>
        <a className="actionsContent" href={`/content/${state.meta.id}`}>
          <RiMessageLine size="20px" color="gray" />
          <div>{state.meta.comment_count}</div>
        </a>
      </div>
    </div>
  );
}