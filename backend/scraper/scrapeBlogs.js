import axios from "axios";
import * as cheerio from "cheerio";
import Article from "../models/Article.js";

export const scrapeBlogs = async () => {
  const url = "https://beyondchats.com/blogs/page/14/"; // last page

  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const articles = [];

  $("a").each((i, el) => {
    if (articles.length >= 5) return;

    const title = $(el).text().trim();
    let link = $(el).attr("href");

    // skip invalid links
    if (!link) return;

    // only blog links
    if (!link.includes("/blogs/") || link.includes("/tag/")) return;

    // fix relative URLs
    if (link.startsWith("/")) {
      link = "https://beyondchats.com" + link;
    }

    // skip short/invalid titles
    if (title.length < 20) return;

    articles.push({
      title,
      url: link,
      originalContent: "PLACEHOLDER CONTENT",
    });
  });

  console.log("FINAL ARTICLES TO INSERT:", articles.length);

  if (articles.length === 0) {
    console.log("❌ No articles found. Aborting insert.");
    return;
  }

  // clear old junk
  await Article.deleteMany();

  // insert new articles
  await Article.insertMany(articles);

  console.log("✅ Articles successfully inserted into MongoDB");
};
