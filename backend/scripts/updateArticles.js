import axios from "axios";

// fetch articles from backend
async function fetchArticles() {
  const response = await axios.get("http://localhost:5000/api/articles");
  return response.data;
}

// generate unique reference URLs based on article title
async function googleSearch(title) {
  // create a "slug" from the title
  const slug = title.toLowerCase().replace(/\s+/g, "-").slice(0, 20);
  return [
    { title: `Reference for ${title} - 1`, url: `https://example.com/${slug}-ref1` },
    { title: `Reference for ${title} - 2`, url: `https://example.com/${slug}-ref2` }
  ];
}

// generate mock scraped content
async function scrapeArticleContent(url, title) {
  return `This content is a summarized insight for "${title}" from ${url}`;
}

// generate updated article content including references
async function generateUpdatedContent(original, content1, content2) {
  return `
Updated Article Content

${original}

References used:
- ${content1}
- ${content2}
`;
}

// update article in backend
async function updateArticle(id, updatedContent, references) {
  await axios.put(`http://localhost:5000/api/articles/${id}`, {
    updatedContent,
    references,
    isUpdated: true
  });
}

// main function to update all articles
async function main() {
  const articles = await fetchArticles();

  for (const article of articles) {
    if (article.isUpdated) continue; // skip already updated

    const searchResults = await googleSearch(article.title);

    const content1 = await scrapeArticleContent(searchResults[0].url, article.title);
    const content2 = await scrapeArticleContent(searchResults[1].url, article.title);

    const updatedContent = await generateUpdatedContent(
      article.originalContent,
      content1,
      content2
    );

    await updateArticle(
      article._id,
      updatedContent,
      [searchResults[0].url, searchResults[1].url]
    );

    console.log(`✅ Updated article: ${article.title}`);
  }

  console.log("🎯 All articles updated successfully!");
}

main();
