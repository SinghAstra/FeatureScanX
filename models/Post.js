import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const mediaSchema = new mongoose.Schema({
  type: { type: String, enum: ["image", "video"], required: false },
  highResUrl: { type: String, required: true },
  lowResUrl: { type: String, required: true },
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
    slug: { type: String, unique: true, lowercase: true, trim: true },
  },
  { timestamps: true }
);

const generateSlug = async (caption, PostModel) => {
  let slug = caption
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens

  // Check for existing slugs and modify if needed
  let originalSlug = slug;
  let counter = 1;

  while (await PostModel.findOne({ slug })) {
    slug = `${originalSlug}-${counter}`;
    counter++;
  }

  return slug;
};

// Pre-save hook to set the slug
postSchema.pre("save", async function (next) {
  if (this.caption && this.isModified("caption")) {
    this.slug = await generateSlug(this.caption, mongoose.model("Post"));
  } else if (this.isNew) {
    // Handle new posts with empty captions
    this.slug = `post-${this._id}`; // Default slug using post ID
  }
  next();
});

const Post = mongoose.model("Post", postSchema);
export default Post;
