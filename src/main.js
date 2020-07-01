import { showDate, showTime } from "./js/DateAndTime.js";
import setBackground from "./js/MainBackground.js";
import showWeather from "./js/CurrentWeatherInfo.js";
import showNextRaceSchedule from "./js/NextRaceInfo.js";
import "./main.css";
import "./assets/icons/logo.png";

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", executeScripts);
} else {
  executeScripts();
}

function executeScripts() {
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
    import(/* webpackChunkName: "secondpage" */ "./js/SecondaryMain.js")
      .then(({ default: _ }) => {})
      .catch((error) => "An error occurred while loading the component");
  });

  //Onclick Previous Page
  let previousPageButton = document.getElementById("previousPageButton");
  previousPageButton.addEventListener("click", () => {
    document.getElementById("page-1").scrollIntoView({
      behavior: "smooth",
    });
  });

  //Appending the current year on fixtures title
  let tableTitle = document.querySelector(".fixtures-container__title > h3");
  tableTitle.innerHTML += " " + new Date().getFullYear();

  function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function checkSecondPage() {
    const loadPageAt = window.scrollY + window.innerHeight;
    const pageOneHeight = document.querySelector("#page-1").offsetHeight;
    const pageTwoHeight = document.querySelector("#page-2").offsetHeight;

    if (loadPageAt > pageOneHeight + pageTwoHeight / 2) {
      import(/* webpackChunkName: "secondpage" */ "./js/SecondaryMain.js")
        .then(({ default: _ }) => {})
        .catch((error) => "An error occurred while loading the component");
    }
  }

  window.addEventListener("scroll", debounce(checkSecondPage));
}
