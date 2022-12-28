import "./Profile.css"
import Home from "./Home";

export default function Profile(props) {
  let tweets = [
    {
      body: "Hello World!",
      postedBy: "Surya",
      likes: 0,
      likedByUser: false
    },
    {
      body: "Test",
      postedBy: "user1",
      likes: 0,
      likedByUser: false
    },
    {
      body: `But I wonder where were you?
      When I was at my worst down on my knees
      And you said you had my back
      So I wonder where were you?
      When all the road you took came back to me
      So I'm following the map that leads to you
      `,
      postedBy: "Maroon5",
      likes: 0,
      likedByUser: false
    },
    {
      body: `It's over Anakin.
      I have the high ground`,
      postedBy: "Obi-Wan Kenobi",
      likes: 21,
      likedByUser: false
    },
    {
      body: "I hate you!!!!",
      postedBy: "Anakin Skywalker",
      likes: 20,
      likedByUser: false
    }
  ];
  if (props.type === "likes") {
    return (
        <div id={"profileSection"}>
          <div id={"userName"}>Balasurya Ganesamoorthy</div>
          <nav id={"profileNav"}>
            <div className={"navElement"} id={"tweetsNav"}>
              <a className={"anchor"} href={"/profile"}>Tweets</a>
            </div>
            <div className={"navElement"} id={"likesNav"} style={{borderBottom: "2px solid white"}}>
              <a className={"anchor"} href={"/profile/likes"}>Likes</a>
            </div>
          </nav>
          <Home value={tweets}/>
        </div>
    );
  }
  return (
      <div id={"profileSection"}>
        <div id={"userName"}>Balasurya Ganesamoorthy</div>
        <nav id={"profileNav"}>
          <div className={"navElement"} id={"tweetsNav"} style={{borderBottom: "2px solid white"}}>
            <a className={"anchor"} href={"/profile"}>Tweets</a>
          </div>
          <div className={"navElement"} id={"likesNav"}>
            <a className={"anchor"} href={"/profile/likes"}>Likes</a>
          </div>
        </nav>
        <Home value={tweets}/>
      </div>
  );
}