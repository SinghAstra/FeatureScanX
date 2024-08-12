import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const mediaSchema = new mongoose.Schema({
  type: { type: String, enum: ["image", "video"], required: false },
  url: { type: String, required: true },
});

const postSchema = new mongoose.Schema(
  {
    media: [mediaSchema],
    caption: { type: String },
    location: { type: String },
    userId: { type: ObjectId, required: true, ref: "User" },
    likes: [{ type: ObjectId, ref: "Like" }],
    comments: [{ type: ObjectId, ref: "Comment" }],
    hashtags: [{ type: ObjectId, ref: "Hashtag" }],
    mentions: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
