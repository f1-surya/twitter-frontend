import { useState } from "react";
import { AiFillCloseCircle, AiOutlineSearch } from "react-icons/ai";
import search from "../search.png";
import getData from "../Utils";
import "./SearchBar.css";

function ProfileTile(props: any): JSX.Element {
  const hide = props.profile.username === sessionStorage.username;

  function viewProfile() {
    (document.getElementById("searchBar") as HTMLInputElement).value = "";
    props.setState({ firstTime: false, data: [] });
    (document.getElementById("clearButton") as HTMLDivElement).style.display = "none";
  }

  return (
    <a className="result" onClick={viewProfile} href={`/profile/${props.profile.username}/tweets`}
      style={hide ? { display: "none" } : {}}>
      <AiOutlineSearch size="28px" style={{padding: "10px"}} />
      <div>
        <div>{props.profile.fullName}</div>
        <div>@{props.profile.username}</div>
      </div>
    </a>
  );
}

export default function SearchBar() {
  const [state, setState] = useState({ firstTime: true, data: [] });
  const focus = () => (document.getElementById("searchWrapper") as HTMLDivElement).style.border = "1px solid #1DA1F2";
  const blur = () => (document.getElementById("searchWrapper") as HTMLDivElement).style.border = "none";

  function onChange() {
    const value = (document.getElementById("searchBar") as HTMLInputElement).value;
    if (value.length > 0) {
      (document.getElementById("clearButton") as HTMLDivElement).style.display = "block";
      getData(setState, `http://65.1.114.106/api/profile?query=search&username=${value}`, "search");
    }
    else {
      setState({ firstTime: false, data: [] });
      (document.getElementById("clearButton") as HTMLDivElement).style.display = "none";
    }
  }

  function clear() {
    (document.getElementById("searchBar") as HTMLInputElement).value = "";
    setState({ firstTime: false, data: [] });
    (document.getElementById("clearButton") as HTMLDivElement).style.display = "none";
  }

  return (
    <div>
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