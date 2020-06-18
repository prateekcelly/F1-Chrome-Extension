import fetchLatestF1News from "./FetchNews";

//Onclick Previous Page
let previousPageButton = document.getElementById("previousPageButton");
previousPageButton.addEventListener("click", () => {
  document.getElementById("page-1").scrollIntoView({
    behavior: "smooth",
  });
});

fetchLatestF1News();
