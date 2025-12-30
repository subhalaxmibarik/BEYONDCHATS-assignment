import express from "express";
import Article from "../models/Article.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { title, url, originalContent } = req.body;

    const article = new Article({
      title,
      url,
      originalContent
    });

    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all articles
router.get("/", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 5; // since assignment only needs 5

  const articles = await Article.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: 1 }); // oldest first (matches requirement)

  res.json(articles);
});

router.put("/:id", async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedArticle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
