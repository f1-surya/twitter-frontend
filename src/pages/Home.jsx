import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../components/Content.jsx";
import getData from "../Utils.js";
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
        getData(setState, `http://0.0.0.0/`);
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
        {state.data.map((tweet, i) => (<Content data={tweet} key={i} tweet={true} />))}
      </div>
    </main>
  );
}