import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { scrapeBlogs } from "./scraper/scrapeBlogs.js";
import articleRoutes from "./routes/articleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/articles", articleRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected to: beyondChats");

    // await scrapeBlogs(); // RUN ONCE
    console.log("Scraping completed");
  })
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
