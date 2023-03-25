import axios from "axios";
import { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useParams } from "react-router-dom";
import getData from "../Utils";
import Content from "./Content.jsx";
import "./Thread.css";
import ThreadTop from "./ThreadTop";

export default function Thread() {
  const { pk } = useParams();
  const [state, setState] = useState({
    firstTime: true,
    data: null,
    parent: null
  });

  if (state.firstTime) {
    getData(setState, `http://65.1.114.106/api/comment/${pk}`, "thread");
  }

  if (!state.data || !state.parent) {
    return <div></div>;
  }

  function reply() {
    const reply = document.getElementById("newComment").value;
    if (reply.length > 0) {
      const config = {
        method: "post",
        url: `http://65.1.114.106/api/comment/${state.parent[state.parent.length - 1].meta.id}`,
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

  const back = () => window.history.back();

  document.title = `${state.parent[state.parent.length - 1].meta.author_name} on Twitter`;

  return (
    <main className="wrapper">
      <div className="back" onClick={back}>
        <HiArrowLeft size={"25px"} />
      </div>
      {state.parent.map((parent, i) => {
        if (i === state.parent.length - 1) {
          return <ThreadTop data={parent} key={i} parentUsername={state.parent[i].meta.content_type === "comment"
            ? state.parent[i - 1].meta.author : null} />;
        }
        return <Content data={parent} key={i} thread={true} first={i === 0}
          parentUsername={state.parent[i].meta.content_type === "comment"
            ? state.parent[i - 1].meta.author : null} />;
      })}
      <div className="createComment">
        <textarea id="newComment" type="text" placeholder="Tweet your reply" defaultValue=""
          onChange={adjustHeight} />
        <button id="replyButton" type="button" onClick={reply}>
          Reply
        </button>
      </div>
      <div>
        {state.data.map((comment, i) => (<Content data={comment} key={i}
          parentUsername={state.parent[state.parent.length - 1].meta.author} />))}
      </div>
    </main>
  );
}
