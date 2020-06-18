import "../Styles/DateAndTime.css";

export function showTime() {
  let date = new Date();

  let time = date.getTime();
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59
  let session = "AM";

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  let timeToDisplay = h + ":" + m;
  window.document.getElementById("ClockDisplay").innerHTML = timeToDisplay;

  setTimeout(showTime, 1000);
}

export function showDate() {
  let date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let dayOfWeek = days[date.getDay()];
  let month = months[date.getMonth()];
  let dateOfMonth = date.getDate();
  let year = date.getFullYear();

  let displayDate =
    dayOfWeek + "<br/>" + month + " " + dateOfMonth + ", " + year;

  document.getElementById("DateDisplay").innerHTML = displayDate;
}
