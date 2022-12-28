import React from "react";
import Tweet from "../components/Tweet";

class Home extends React.Component {

  render() {
    return (
        <main style={this.props.style}>
          <div>
            {this.props.value.map((tweet, index) => (<Tweet key={index} index={index} tweet={tweet}/>))}
          </div>
        </main>
    );
  }
}

export default Home;