import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../components/Content.jsx";
import MiniThread from "../components/MiniThread.jsx";
import getData from "../Utils";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [state, setState] = useState({ firstTime: true, data: [] });

  useEffect(() => {
    if (sessionStorage.token === undefined) {
      navigate("/login");
    }
    else {
      if (state.firstTime) {
        getData(setState, "http://65.1.114.106/api/");
      }
      else if (state.data.length === 0) {
        navigate("/users");
      }
    }
  }, [navigate, state]
  );

  document.title = "Home";

  return (
    <main>
      <div>
        {state.data.map((content, i) => {
          if (content.comments.length > 0) {
            return <MiniThread data={content} key={i} />;
          }
          return <Content data={content} key={i} />;
        })}
      </div>
    </main>
  );
}