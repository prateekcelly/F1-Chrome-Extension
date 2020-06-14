import { showDate, showTime } from "./dateTime.js";
import setBackground from "./background.js";
import showWeather from "./weatherInfo.js";
import showNextRaceSchedule from "./raceInfo.js";

let chromeTab = document.getElementById("backgroundChangeTab");
chromeTab.addEventListener("click", async () => {
  let backgroundId = Math.round(Math.random() * 365);
  await setBackground(backgroundId);
});

function executeScripts() {
  setBackground();
  showNextRaceSchedule();
  showWeather();
  showDate();
  showTime();
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", executeScripts);
} else {
  executeScripts();
}

let settingIcon = document.getElementById("settingIcon");
let settingTab = document.getElementById("settingTab");
settingIcon.addEventListener("click", () => {
  if (settingIcon.classList.contains("settingTabOpened")) {
    settingIcon.classList.remove("settingTabOpened");
    settingTab.style.clipPath = "circle(0% at 0% 100%)";
    settingIcon.style.opacity = "0.5";
  } else {
    settingIcon.classList.add("settingTabOpened");
    settingTab.style.clipPath = "circle(150% at 0% 100%)";
    settingIcon.style.opacity = "1";
  }
});
