import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileGlance.css";

export default function ProfileGlance({ profile, currUser }) {
  const [followedByUser, setFollowedByUser] = useState(profile.followed_by_user);
  const navigate = useNavigate();
  const hide = currUser === profile.user || profile.user === sessionStorage.username ||
    profile.user === "surya";

  function goToProfile() {
    navigate(`/profile/${profile.user}`);
  }

  const style = {
    backgroundColor: "inherit",
    border: "2px solid white",
    color: "white"
  };

  function follow() {
    const config = {
      url: "http://65.1.114.106/api/profile",
      method: "put",
      headers: {
        Authorization: `Token ${sessionStorage.token}`
      },
      data: {
        query: "follow",
        username: profile.user
      }
    };
    axios(config);
    setFollowedByUser(!followedByUser);
  }

  return (
    <div className="profileGlance" style={hide ? { display: "none" } : {}}>
      <div className="details" onClick={goToProfile}>
        <b>{profile.full_name}</b>
        <div className="userTag">@{profile.user}</div>
        <p>{profile.about}</p>
      </div>
      <div className="buttonContainer">
        <button className="followButton" id="button" style={followedByUser ? style : {}} onClick={follow}>
          {followedByUser ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
}