import axios from "axios";

export default function getData(setState: Function, url: string, type: string) {
  const config = {
    method: "get",
    url: url,
    headers: {
      Authorization: "Token " + sessionStorage.token
    }
  };

  axios(config)
    .then((response) => {
      if (type === "thread") {
        response.data[0].forEach(contentAge);
        response.data[1].forEach(contentAge);
        setState({ firstTime: false, data: response.data[1], parent: response.data[0] });
      }
      else if (type === "search" || type === "profile") {        
        setState({ firstTime: false, data: response.data });
      }
      else {
        response.data.forEach(contentAge);
        setState({ firstTime: false, data: response.data });
      }
    })
    .catch(error => console.log(error));
}

export function contentAge(content: any) {
  const postedDate = new Date(content.meta.posted_date);
  const now = Date.now();
  const diffTime = Math.abs(postedDate.valueOf() - now);
  const diffMinutes = Math.ceil(diffTime / 60000);
  const diffHours = Math.ceil(diffTime / 3600000);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.ceil(diffDays / 30);

  if (diffMinutes <= 1) {
    content.age = "1 minute";
  }
  else if (diffMinutes < 60) {
    content.age = diffMinutes + " minutes";
  }
  else if (diffHours < 24) {
    content.age = diffHours + "hours";
  }
  else if (diffDays === 1) {
    content.age = "yesterday";
  }
  else if (diffDays < 30) {
    content.age = diffDays + "days";
  }
  else if (diffMonths >= 1) {
    content.age = diffMonths + "months";
  }
}

export function fetchData(url: string, setState: Function, type: string) {
  const config = {
    url: url,
    method: "get",
    headers: { "Authorization": "Token " + sessionStorage.token },
  };

  axios(config)
    .then((response) => {
      response.data.content.forEach(contentAge);
      setState({
        firstTime: false,
        profile: response.data.profile,
        content: response.data.content
      });
      sessionStorage.otherUser = response.data.profile.user;
      sessionStorage.fullName = response.data.profile.full_name;
    });
}