import { showDate, showTime } from "./Components/DateAndTime.js";
import setBackground from "./Components/MainBackground.js";
import showWeather from "./Components/CurrentWeatherInfo.js";
import showNextRaceSchedule from "./Components/NextRaceInfo.js";
import "./main.css";
import "./assets/icons/logo.png";

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", executeScripts);
} else {
  executeScripts();
}

function executeScripts() {
  //Stop Mouse Scroll
  window.addEventListener(
    "wheel",
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );

  //-----------Execute Functions: Start--------------//
  setBackground();
  showNextRaceSchedule();
  showWeather();
  showDate();
  showTime();
  //-----------Execute Functions: End----------------//

  //Onclick Background Change
  let chromeTab = document.getElementById("backgroundChangeTab");
  chromeTab.addEventListener("click", async () => {
    let backgroundId = Math.round(Math.random() * 365);
    await setBackground(backgroundId);
  });

  //Onclick Setting Tab Switch
  let settingIcon = document.getElementById("settingIcon");
  let settingTab = document.getElementById("settingTab");
  settingIcon.addEventListener("click", () => {
    if (settingIcon.classList.contains("settingtab-opened")) {
      settingIcon.classList.remove("settingtab-opened");
      settingTab.style.clipPath = "circle(0% at 0% 100%)";
      settingIcon.style.opacity = "0.5";
    } else {
      settingIcon.classList.add("settingtab-opened");
      settingTab.style.clipPath = "circle(150% at 0% 100%)";
      settingIcon.style.opacity = "1";
    }
  });

  //Onclick Next Page
  let nextPageButton = document.getElementById("nextPageButton");
  nextPageButton.addEventListener("click", () => {
    document.getElementById("page-2").scrollIntoView({
      behavior: "smooth",
    });
    import(/* webpackChunkName: "secondpage" */ "./Components/SecondPage.js")
      .then(({ default: _ }) => {})
      .catch((error) => "An error occurred while loading the component");
  });
}
