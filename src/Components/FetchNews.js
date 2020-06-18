import cheerio from "cheerio";
import fetch from "node-fetch";

export default async function fetchLatestF1News() {
  const url =
    "https://cors-anywhere.herokuapp.com/" +
    "https://www.motorsport.com/f1/news/?p=1";
  const data = await fetch(url);
  const $ = cheerio.load(await data.text());
  const newsDetails = $(".ms-item--art")
    .get()
    .slice(0, 8)
    .map((individualNews) => {
      const $individualNews = $(individualNews);
      const imgsrc = $individualNews
        .find(".ms-item_thumb")
        .find("a")
        .find("img")
        .attr("data-src");
      const title = $individualNews
        .find(".ms-item_thumb")
        .find("a")
        .attr("title");
      const link = $individualNews
        .find(".ms-item_thumb")
        .find("a")
        .attr("href");
      const info = $individualNews
        .find(".ms-item_info")
        .find(".ms-item_subheader-wrapper")
        .find("p")
        .text();
      return {
        src: imgsrc,
        title: title,
        link: link,
        info: info,
      };
    });
  return newsDetails;
}
