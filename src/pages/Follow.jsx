import React, { useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import ProfileGlance from "../components/ProfileGlance";
import getData from "../Utils";
import "./Follow.css";

export default function Follow() {
  const { user, type } = useParams();
  const [state, setState] = useState({ firstTime: true, data: [] });
  const navigate = useNavigate();

  useEffect(() => {
    getData(setState, `http://0.0.0.0/profile?query=${type}&username=${user}`);
  }, [setState, type, user]);

  function back() {
    navigate(`/profile/${user}`);
  }

  return (
    <main>
      <div className="topBar" >
        <div className="back" onClick={back}>
          <HiArrowLeft size={"25px"} />
        </div>
        <div>
          <b className="fullName">{sessionStorage.fullName}</b>
          <div className="userTag">
            @{sessionStorage.otherUser}
          </div>
        </div>
      </div>
      <div className="categories">
        <a className="category" id="followers" href={`/profile/${sessionStorage.otherUser}/followers`}
          style={type === "followers" ? { borderBottom: "5px solid #1DA1F2" } : {}}>
          Followers
        </a>
        <a className="category" id="following" href={`/profile/${sessionStorage.otherUser}/following`}
          style={type === "following" ? { borderBottom: "5px solid #1DA1F2" } : {}}>
          Following
        </a>
      </div>
      <div>
        {state.data.map((profile, i) => <ProfileGlance profile={profile} key={i} currUser={sessionStorage.otherUser} />)}
      </div>
    </main>
  );
}