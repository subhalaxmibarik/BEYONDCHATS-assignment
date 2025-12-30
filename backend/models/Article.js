import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    originalContent: { type: String, default: "" },
    updatedContent: { type: String, default: "" },
    references: { type: [String], default: [] },
    isUpdated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
