import React, {useState, useEffect} from "react";
import getData from "../Utils";
import "./UserList.css";
import ProfileGlance from "../components/ProfileGlance";

export default function UserList() {
  const [state, setState] = useState({firstTime: true, data: []});
  useEffect(() => {
    if (state.firstTime) {
      getData(setState, "http://0.0.0.0/profile?query=profileList");
    }
  }, [state, setState]);
  
  return (
    <main>
      <div className="message">
        <h3 >Looks like you're not following anyone.</h3>
        <p>Here are some Users to get started with.</p>
      </div>
      <div className="profiles">
      {state.data.map((profile, i) => <ProfileGlance profile={profile} key={i} currUser={sessionStorage.username} />)}
      </div>
    </main>
  );
}
