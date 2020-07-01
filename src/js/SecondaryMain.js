import fetchF1News from "./FetchNews";
import fetch from "node-fetch";

function getNewsfeed(newsArray) {
  let newsCards = [];
  for (let i = 0; i < 8; i++) {
    let cardReference = document.getElementById("newsCard" + (i + 1));
    newsCards.push(cardReference);
  }

  var date = new Date();
  var displayDate =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

  let newsCardNumber = 0;
  newsArray.map((news) => {
    const currentCard = newsCards[newsCardNumber++];

    const cardLink = currentCard.querySelector(".news-card__link");
    cardLink.setAttribute("href", news.link);

    const cardImage = currentCard.querySelector(
      ".news-card__column1 > .news-card__image"
    );
    cardImage.setAttribute("src", news.src);
    cardImage.setAttribute("alt", news.title);

    const cardDate = currentCard.querySelector(
      ".news-card__column1 > .news-card__date"
    );
    cardDate.innerHTML = displayDate;

    const cardTitle = currentCard.querySelector(
      ".news-card__column2 > .news-card__title"
    );
    cardTitle.innerHTML = news.title;

    const cardInfo = currentCard.querySelector(
      ".news-card__column2 > .news-card__info"
    );
    cardInfo.innerHTML = news.info;
  });

  const loader = document.querySelector(".news-container #loader");
  const newsFeed = document.querySelector(".news-container__cards");
  newsFeed.style.display = "block";
  loader.style.display = "none";
}

function getFixtures() {
  const year = new Date().getFullYear();
  const fixturesURL = "http://ergast.com/api/f1/" + year + ".json";

  fetch(fixturesURL)
    .then((response) => response.json())
    .then((response) => {
      const races = response.MRData.RaceTable.Races;
      const tableContent = races
        .map((race) => {
          const round = race.round;
          const raceName = race.raceName;
          const circuit = race.Circuit.circuitName;
          const date = race.date;

          const row = `<tr>
          <td>${round}</td>
          <td>${raceName}</td>
          <td>${circuit}</td>
          <td>${date}</td>
        </tr>`;
          return row;
        })
        .join("");

      let table = document.querySelector(
        ".fixtures-container__table > table > tbody"
      );
      table.innerHTML += tableContent;
    });
}

fetchF1News().then((newsArray) => getNewsfeed(newsArray));
getFixtures();

const newsCards = document.querySelector(".news-container__cards");
newsCards.addEventListener(
  "wheel",
  function (e) {
    console.log("Hello");

    e.returnValue = true;
    // e.preventDefault();
  },
  { passive: false }
);
