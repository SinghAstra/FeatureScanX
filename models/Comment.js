import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema(
  {
    postId: { type: ObjectId, required: true, ref: "Post" },
    userId: { type: ObjectId, required: true, ref: "User" },
    content: { type: String, required: true },
    likes: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
