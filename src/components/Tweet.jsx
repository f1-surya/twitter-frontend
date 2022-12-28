import "./Tweet.css"

export default function Tweet({tweet: {body, postedBy, likes, likedByUser}, index}) {
  return (
      <div className={"border"}>
        <div className={"tweet"}>
          <em className={"username"}><b>{postedBy}</b></em>
          <p className={"body"}>{body}</p>
          <p className={"likes"}>Likes: {likes}</p>
        </div>
      </div>
  )
}