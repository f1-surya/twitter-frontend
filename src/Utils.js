import axios from "axios";

export default function getData(setState, url) {
  const config = {
    method: "get",
    url: url,
    headers: {
      Authorization: "Token " + sessionStorage.token
    }
  };

  axios(config)
    .then((response) => {
      if (Array.isArray(response.data) && response.data.length > 0) {
        response.data.forEach(contentAge);
      }
      setState({ firstTime: false, data: response.data });
    })
    .catch(error => console.log(error));
}

function contentAge(content) {
  const postedDate = new Date(content.posted_date);
  const now = Date.now();
  const diffTime = Math.abs(postedDate - now);
  const diffMinutes = Math.ceil(diffTime / 60000);
  const diffHours = Math.ceil(diffTime / 3600000);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.ceil(diffDays / 30);

  if (diffMinutes <= 1) {
    content["age"] = "1 minute ago";
  }
  else if (diffMinutes < 60) {
    content["age"] = diffMinutes + " minutes ago";
  }
  else if (diffHours < 24) {
    content["age"] = diffHours + "hours ago";
  }
  else if (diffDays === 1) {
    content["age"] = "yesterday";
  }
  else if (diffDays < 30) {
    content["age"] = diffDays + "days ago";
  }
  else if (diffMonths >= 1) {
    content["age"] = diffMonths + "monts ago";
  }
}

export function fetchData(url, setState) {
  const config = {
    url: url,
    method: "get",
    headers: { "Authorization": "Token " + sessionStorage.token },
  };
  axios(config)
    .then((response) => {
      response.data.tweets.forEach(contentAge);
      setState({
        firstTime: false,
        profile: response.data.profile,
        content: response.data.tweets
      });
    });
}