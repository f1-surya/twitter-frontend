import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import search from "../search.png";
import getData from "../Utils";
import "./Explore.css";

function ProfileTile({ profile, setState }) {
  function viewProfile() {
    document.getElementById("searchBar").value = "";
    setState({ firstTime: false, data: [] });
    document.getElementById("clearButton").style.display = "none";
  }

  return (
    <a className="result" onClick={viewProfile} href={`/profile/${profile.username}`}>
      <div>{profile.fullName}</div>
      <div>@{profile.username}</div>
    </a>
  );
}


export default function Explore() {
  const [state, setState] = useState({ firstTime: true, data: [] })

  function onChange() {
    const value = document.getElementById("searchBar").value;
    if (value.length > 0) {
      document.getElementById("clearButton").style.display = "block";
      getData(setState, `http://0.0.0.0/profile/search/${value}`);
    }
    else {
  setState({ firstTime: false, data: [] });
  document.getElementById("clearButton").style.display = "none";
}
  }

function clear() {
  document.getElementById("searchBar").value = "";
  setState({ firstTime: false, data: [] });
  document.getElementById("clearButton").style.display = "none";
}

function focus() {
  document.getElementById("searchWrapper").style.border = "1px solid #1DA1F2";
}

function blur() {
  document.getElementById("searchWrapper").style.border = "none";
}

return (
  <div id="RightSide">
    <div className="searchContainer">
      <div id="searchWrapper">
        <img id="searchLogo" src={search} alt="search" />
        <input id="searchBar" type="text"
          placeholder="Search..." name="search"
          onChange={onChange} onFocus={focus} onBlur={blur} />
        <div id="clearButton" onClick={clear}>
          <AiFillCloseCircle color="#1DA1F2" size={"20px"} />
        </div>
      </div>
      <div className="resultsContainer">
        {state.data.map((profile, i) =>
          (<ProfileTile profile={profile} key={i} setState={setState} />)
        )}
      </div>
    </div>
  </div>
);
}