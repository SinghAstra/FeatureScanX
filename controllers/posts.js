import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const user = req.user.id;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { location, description } = req.body;

    let picturePath = "";

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          { folder: "posts", timeout: 60000 },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    picturePath = await streamUpload(req.file.buffer);

    console.log("picturePath", picturePath);

    const post = new Post({
      user,
      location,
      description,
      picturePath: picturePath.url,
    });

    await post.save();

    res.status(201).json(post);
  } catch (err) {
    console.log("error is ", err);
    res.status(409).json({ message: "Error while Creating Post." });
  }
};

export const newPost = async (req, res) => {
  try {
    // const user = "66ab999508af48389ec5a2df";
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { picturePath, location, description } = req.body;

    const post = new Post({
      user,
      location,
      description,
      picturePath,
    });

    await post.save();

    res.status(201).json(post);
  } catch (err) {
    console.log("error is ", err);
    res.status(409).json({ message: "Error while Creating Post." });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("following");
    const followingIds = user.following.map((following) => following._id);

    const posts = await Post.find({ user: { $in: followingIds } })
      .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    console.log("error is ", err);
    res.status(500).json({ message: "Error while fetching feed posts." });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error - getAllPosts" });
  }
};

export const deleteAllPosts = async (req, res) => {
  try {
    await Post.deleteMany({});
    res.status(200).json({ message: "All Posts Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
