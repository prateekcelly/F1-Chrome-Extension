import "../css/NextRaceInfo.css";

async function fetchNextRaceSchedule() {
  let raceInfoURL = "https://ergast.com/api/f1/current/next.json";
  let raceInfo;

  try {
    let response = await fetch(raceInfoURL);

    if (response.ok) {
      response = await response.json();

      let season = response.MRData.RaceTable.season.toString();
      let round = response.MRData.RaceTable.round.toString();
      let raceName = response.MRData.RaceTable.Races[0].raceName.toString();
      let date = response.MRData.RaceTable.Races[0].date.toString();
      let time = response.MRData.RaceTable.Races[0].time.toString();
      let circuit = response.MRData.RaceTable.Races[0].Circuit.circuitName.toString();
      let country = response.MRData.RaceTable.Races[0].Circuit.Location.country.toString();

      let h = parseInt(time.slice(0, 2));
      let m = parseInt(time.slice(3, 5));
      let s = parseInt(time.slice(6, 8));
      let session = "AM";
      let tempDate = new Date();

      let UTCOffsetHours = Math.floor(
        parseInt(-tempDate.getTimezoneOffset()) / 60
      );
      let UTCOffsetMinutes = parseInt(-tempDate.getTimezoneOffset()) % 60;

      h += UTCOffsetHours;
      m += UTCOffsetMinutes;

      if (m >= 60) {
        m -= 60;
        h += 1;
      }

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

      time = h + ":" + m + " " + session;

      raceInfo =
        "Next Race" +
        "<br />" +
        "<br />" +
        raceName +
        " " +
        season +
        "<br />" +
        circuit +
        ", " +
        country +
        "<br />On " +
        date +
        "<br />At " +
        time;

      localStorage.setItem("raceInfo", raceInfo);
    }
  } catch (error) {}
}

export default async function showNextRaceSchedule() {
  let currentHour = new Date().getHours().toString();
  let savedHour = localStorage.getItem("savedHour");
  if (savedHour === null || (savedHour !== null && savedHour !== currentHour))
    await fetchNextRaceSchedule();
  localStorage.setItem("savedHour", new Date().getHours());

  let raceInfo = localStorage.getItem("raceInfo");
  if (raceInfo === null)
    raceInfo =
      "Connect to a network <br/> to get the latest details of <br/> the next Grand Prix!";
  document.getElementById("raceInfoLoader").style.display = "none";
  document.getElementById("raceInfoDisplay").innerHTML = raceInfo;
  document.getElementById("raceInfoDisplay").classList.add("raceInfoDisplay");
}
