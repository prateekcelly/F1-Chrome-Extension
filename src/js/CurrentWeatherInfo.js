import keys from "./Config.js";
import "../css/CurrentWeaterInfo.css";

let currentWeatherElement = document.getElementById("currentWeather");
function fetchWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCurrentWeather);
  } else {
    currentWeatherElement.innerHTML =
      "Geolocation is not supported <br/> by this browser.";
  }
}

async function getCurrentWeather(position) {
  let apiKey = keys.openWeather_apiKey;
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let weatherURL =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    apiKey +
    "&units=metric";

  try {
    let response = await fetch(weatherURL);
    if (response.ok) {
      response = await response.json();
      const temperature = Math.round(response.main.temp);
      const city = response.name;
      const temperature_min = response.main.temp_min;
      const temperature_max = response.main.temp_max;
      const feels_like = response.main.feels_like;
      const humidity = response.main.humidity;

      const icon =
        "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";

      localStorage.setItem("temperature", temperature);
      localStorage.setItem("icon", icon);
      localStorage.setItem("city", city);
    } else {
      localStorage.setItem("temperature", "--");
    }
  } catch (error) {
    localStorage.setItem("temperature", "--");
  }
}

export default function showWeather() {
  let currentMinute = new Date().getMinutes().toString();
  let savedMinute = localStorage.getItem("savedMinute");

  if (
    savedMinute === null ||
    (savedMinute !== null && savedMinute !== currentMinute)
  )
    fetchWeather();
  localStorage.setItem("savedMinute", new Date().getMinutes());
  let icon = localStorage.getItem("icon");
  let temperature = localStorage.getItem("temperature");
  if (temperature === null) temperature = "--";
  let city = localStorage.getItem("city");

  let currentWeatherIcon = document.getElementById("currentWeatherIcon");
  let degreeIcon = document.getElementById("degreeIcon");
  let locationInfo = document.getElementById("locationInfo");
  currentWeatherElement.innerHTML = temperature;

  if (temperature !== "--") {
    currentWeatherIcon.setAttribute("src", icon);
    degreeIcon.innerHTML = "\u00B0";
    locationInfo.innerHTML = city;
  } else {
    localStorage.removeItem("savedMinute");
  }
}
