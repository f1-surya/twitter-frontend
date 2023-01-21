import axios from "axios";
import { useState } from "react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import "./Tweet.css";

export default function Tweet(props) {
  const [state, setState] = useState({
    likedByUser: props.tweet.liked_by_user,
    likesCount: props.tweet.likes_count
  });

  function like() {
    const data = new FormData();
    data.append("pk", props.tweet.id)
    const config = {
      method: "put",
      url: "http://0.0.0.0",
      headers: {
        Authorization: "Token " + sessionStorage.token
      },
      data: data
    };

    axios(config).then(
      (response) => {
        if (state.likedByUser) {
          setState({ likedByUser: false, likesCount: state.likesCount - 1 })
        }
        else {
          setState({ likedByUser: true, likesCount: state.likesCount + 1 })
        }
        console.log(response);
      })
      .catch(
        (error) => {
          console.log(error);
        });
  }

  return (
    <div className={"border"}>
      <div className={"tweet"}>
        <b className={"username"}>{props.tweet.author}</b>
        <a className={"tweetAnchor"} href={"tweet"}>
          <div className={"body"}>{props.tweet.tweet}</div>
        </a>
        <div className={"likes"} onClick={like}>
          {state.likedByUser ? <RiHeartFill size={"20px"} color={"red"} />
            : <RiHeartLine size={"20px"} color={"gray"} />}
          <div>{state.likesCount}</div>
        </div>
      </div>
    </div>
  );
}