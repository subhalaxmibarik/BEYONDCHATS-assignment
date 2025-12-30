import mongoose from "mongoose";
import Article from "../models/Article.js"; // make sure the path is correct

const MONGO_URI = "mongodb+srv://debadattabarik1767_db_user:t58tVhpsEo1YX2iE@cluster0.uputvzg.mongodb.net/beyondChats";

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    const result = await Article.updateMany({}, { $set: { isUpdated: false } });
    console.log(`✅ Reset ${result.modifiedCount} articles to isUpdated: false`);

    mongoose.disconnect();
  })
  .catch(err => console.error(err));
