import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema(
  {
    postId: { type: ObjectId, ref: "Post", required: true },
    userId: { type: ObjectId, ref: "User", required: true },
    commentText: { type: String, required: true },
    likes: [{ type: ObjectId, ref: "User" }],
    replies: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        replyText: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
