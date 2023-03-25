import { BiMessageRounded } from "react-icons/bi";
import Content from "./Content";
import "./MiniThread.css";

export default function MiniThread({ data, i }) {
  return (
    <div className="threadContainer">
      <div className="threadBeginning">
        <BiMessageRounded />
        <p className="pTag">Recieved new reply</p>
      </div>
      <div className="list">
        <Content data={data} key={i} thread={true} first={true} last={false} />
        <div className="comments">
          {data.comments.map(
            (content, i) => <Content data={content} key={i} thread={true}
              last={data.comments.length - 1 === i} comment={true} parentUsername={data.meta.author} />
          )}
        </div>
      </div>
    </div>
  );
}