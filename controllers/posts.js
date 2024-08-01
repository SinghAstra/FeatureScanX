import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    console.log("In creating post");
    console.log("req.body is ", req.body);
    console.log("req.file is ", req.file);
    const userId = req.user.id;
    if (!userId) {
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
      userId,
      location,
      description,
      picturePath: picturePath.url,
    });
    //   await newPost.save();

    res.status(201).json(post);
  } catch (err) {
    console.log("error is ", err);
    res.status(409).json({ message: "Error while Creating Post." });
  }
};
