export function compare(a, b) {
  const date1 = new Date(a.posted_date);
  const date2 = new Date(b.posted_date);
  if (date1.getTime() > date2.getTime()) {
    return -1;
  }
  if (date1.getTime() < date2.getTime()) {
    return 1;
  }
  return 0;
}

export function contentAge(content) {
  const postedDate = new Date(content.posted_date);
  const now = Date.now();
  const diffTime = Math.abs(postedDate - now);
  const diffMinutes =  Math.ceil(diffTime / 60000);
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
    content["age"] = diffDays + "hours ago";
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