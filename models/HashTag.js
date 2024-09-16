import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const hashtagSchema = new mongoose.Schema(
  {
    tag: { type: String, required: true, unique: true },
    posts: [{ type: ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

const Hashtag = mongoose.model("Hashtag", hashtagSchema);
export default Hashtag;
