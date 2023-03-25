import { useEffect, useState } from "react";
import ProfileGlance from "../components/ProfileGlance";
import getData from "../Utils";
import "./UserList.css";

export default function UserList() {
  const [state, setState] = useState({firstTime: true, data: []});
  useEffect(() => {
    if (state.firstTime) {
      getData(setState, "http://65.1.114.106/api/profile?query=profileList", "profile");
    }
  }, [state, setState]);
  
  return (
    <main>
      <div className="message">
        <h3 >Looks like you&apos;re not following anyone.</h3>
        <p>Here are some Users to get started with.</p>
      </div>
      <div className="profiles">
        {state.data.map((profile, i) => <ProfileGlance profile={profile} key={i} currUser={sessionStorage.username} />)}
      </div>
    </main>
  );
}
