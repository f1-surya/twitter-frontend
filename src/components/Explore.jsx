import "./Explore.css";
import SearchBar from "./SearchBar";

export default function Explore(props) {
  return (
    <div className="explore" style={props.search ? {width: "100vh"} : {}}>
      <SearchBar />
    </div>
  );
}