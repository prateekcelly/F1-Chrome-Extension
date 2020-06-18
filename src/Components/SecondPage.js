//Onclick Previous Page
let previousPageButton = document.getElementById("previousPageButton");
previousPageButton.addEventListener("click", () => {
  document.getElementById("page-1").scrollIntoView({
    behavior: "smooth",
  });
});
