import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const likeSchema = new mongoose.Schema(
  {
    postId: { type: ObjectId, required: true, ref: "Post" },
    userId: { type: ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);
export default Like;
