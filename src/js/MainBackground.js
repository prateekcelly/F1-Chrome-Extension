import keys from "./Config.js";

async function fetchBackground(day) {
  try {
    let accessKey = keys.unsplash_accessKey;
    let response = await fetch(
      "https://api.unsplash.com/collections/1445529/photos?orientation=landscape&per_page=30&client_id=" +
        accessKey
    );
    response = await response.json();
    let imageNumber = day % response.length;
    let link = response[imageNumber].urls.regular;
    localStorage.setItem("backgroundImageLink", link);
  } catch (error) {}
}

async function backgroundChanger() {
  let now = new Date();
  let start = new Date(now.getFullYear(), 0, 0);
  let diff =
    now -
    start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  let oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay);
  await fetchBackground(day);
}

export default async function setBackground(backgroundId) {
  if (backgroundId === undefined) {
    let todaysDate = new Date().getDate().toString();
    let savedDate = localStorage.getItem("savedDate");
    if (savedDate === null || (savedDate !== null && savedDate !== todaysDate))
      await backgroundChanger();
    localStorage.setItem("savedDate", new Date().getDate());
  } else {
    await fetchBackground(backgroundId);
  }

  let link = localStorage.getItem("backgroundImageLink");
  if (link === null) backgroundChanger();

  const page1 = document.getElementById("page-1");
  page1.style.background =
    "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('" +
    link +
    "'), black";

  page1.style.backgroundSize = "cover";
  page1.style.backgroundRepeat = "no-repeat";
}
