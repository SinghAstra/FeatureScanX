import ffmpegPath from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
import sharp from "sharp";
import { PassThrough } from "stream";
import cloudinary from "../config/cloudinary.js";
import Hashtag from "../models/Hashtag.js";
import Like from "../models/Like.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

ffmpeg.setFfmpegPath(ffmpegPath);

export const createPostController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { caption, location } = req.body;

    // Initialize array to store media URLs
    const mediaFiles = [];

    // Process uploaded files
    for (const file of req.files) {
      let highResBuffer, lowResBuffer;

      // Compress image if it's an image
      if (file.mimetype.startsWith("image/")) {
        highResBuffer = await sharp(file.buffer)
          .resize(1024, 1024, { fit: "inside" })
          .jpeg({ quality: 80 })
          .toBuffer();

        // Low-resolution version
        lowResBuffer = await sharp(file.buffer)
          .resize(50, 50, { fit: "inside" }) // Adjust the size for placeholder
          .jpeg({ quality: 50 }) // Adjust the quality for placeholder
          .toBuffer();
      } else if (file.mimetype.startsWith("video/")) {
        // Compress video using FFmpeg for high-res
        highResBuffer = await compressVideoWithFFmpeg(file.buffer);

        // Optional: Create a low-res video (use FFmpeg to create a lower bitrate version)
        lowResBuffer = await compressVideoWithFFmpeg(file.buffer, {
          bitrate: "200k",
        });
      } else {
        highResBuffer = file.buffer;
        lowResBuffer = file.buffer;
      }

      // Upload high-resolution version
      const highResUpload = await uploadToCloudinary(
        highResBuffer,
        file.mimetype
      );

      // Upload low-resolution version
      const lowResUpload = await uploadToCloudinary(
        lowResBuffer,
        file.mimetype
      );

      mediaFiles.push({
        type: file.mimetype.startsWith("image/") ? "image" : "video",
        highResUrl: highResUpload.secure_url,
        lowResUrl: lowResUpload.secure_url,
      });
    }

    console.log("mediaFiles is ", mediaFiles);
    // Create and save the post
    const newPost = new Post({
      media: mediaFiles,
      caption,
      location,
      userId,
    });

    // Handle hashtags
    const hashtags = await processHashtags(caption, newPost._id);
    newPost.hashtags = hashtags;

    // Handle mentions
    const mentions = await processMentions(caption);
    newPost.mentions = mentions;

    await newPost.save();

    console.log("newPost is ", newPost);

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.log("error is ", error);
    res.status(500).json({ message: "Error creating post", error });
  }
};

const uploadToCloudinary = (buffer, mimetype) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: mimetype.startsWith("image/") ? "image" : "video",
        folder: "social-app-posts",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    stream.end(buffer);
  });
};

const compressVideoWithFFmpeg = (inputBuffer) => {
  return new Promise((resolve, reject) => {
    const passThroughStream = new PassThrough();
    const outputBuffers = [];

    // Use FFmpeg to process the video
    ffmpeg()
      .input(passThroughStream)
      .outputOptions([
        "-vf scale=640:-1", // Scale the video to a width of 640 pixels, maintaining aspect ratio
        "-c:v libx264", // Encode the video with H.264 codec
        "-preset slow", // Use a slower compression preset (better compression)
        "-crf 28", // Set the quality level (lower CRF means better quality, but larger files)
        "-movflags +faststart", // Optimize video for web streaming
      ])
      .on("end", () => {
        resolve(Buffer.concat(outputBuffers)); // Resolve with the compressed video buffer
      })
      .on("error", (err) => {
        reject(err);
      })
      .pipe(new PassThrough())
      .on("data", (chunk) => {
        outputBuffers.push(chunk); // Collect output chunks
      });

    passThroughStream.end(inputBuffer); // Write the input buffer to the stream
  });
};

const extractHashtags = (caption) => {
  const hashtagRegex = /#(\w+)/g;
  const matches = caption.match(hashtagRegex);
  return matches
    ? matches.map((tag) => {
        return tag.slice(1);
      })
    : [];
};

const processHashtags = async (caption, postId) => {
  const hashtagNames = extractHashtags(caption);

  const hashtags = await Promise.all(
    hashtagNames.map(async (tag) => {
      let hashtag = await Hashtag.findOne({ tag });
      if (!hashtag) {
        hashtag = new Hashtag({ tag, posts: [postId] });
        await hashtag.save();
      } else {
        // If the hashtag already exists, add the post ID if it's not already there
        if (!hashtag.posts.includes(postId)) {
          hashtag.posts.push(postId);
          await hashtag.save();
        }
      }
      return hashtag._id;
    })
  );

  return hashtags;
};

const extractMentions = (caption) => {
  const mentionRegex = /@(\w+)/g;
  const matches = caption.match(mentionRegex);
  return matches ? matches.map((mention) => mention.slice(1)) : [];
};

const processMentions = async (caption) => {
  const mentionUsernames = extractMentions(caption);

  const mentions = await Promise.all(
    mentionUsernames.map(async (username) => {
      const user = await User.findOne({ userName: username });
      return user ? user._id : null;
    })
  );

  // Filter out any null values (in case some mentions did not correspond to valid users)
  return mentions.filter((mention) => mention !== null);
};

export const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const followingIds = user.following;
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    limit = parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10;

    const totalPosts = await Post.countDocuments({
      userId: { $in: followingIds },
    });

    const posts = await Post.find({ userId: { $in: followingIds } })
      .populate("userId", "userName fullName profilePicture")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, controller: getFeedPosts });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error - getAllPosts" });
  }
};

export const getPostBySlug = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postSlug } = req.params;
    const post = await Post.findOne({ slug: postSlug }).populate(
      "userId",
      "userName profilePicture fullName"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const existingLike = await Like.findOne({ postId: post._id, userId });
    res.json({ post, likedByCurrentUser: existingLike ? true : false });
  } catch (error) {
    res.status(500).json({ message: error.message, controller: getPostBySlug });
  }
};
