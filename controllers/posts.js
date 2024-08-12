import cloudinary from "../config/cloudinaryConfig.js";
import Hashtag from "../models/Hashtag.js";
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

    await User.findByIdAndUpdate(user, { $push: { posts: post._id } });

    res.status(201).json(post);
  } catch (err) {
    console.log("error is ", err);
    res.status(409).json({ message: "Error while Creating Post." });
  }
};

// Route to create a post
export const createPostController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { caption, location } = req.body;

    // Initialize array to store media URLs
    const mediaFiles = [];

    // Process uploaded files
    for (const file of req.files) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: file.mimetype.startsWith("image/")
              ? "image"
              : "video",
            folder: "social-app-posts", // Folder in Cloudinary to store posts
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        stream.end(file.buffer);
      });

      mediaFiles.push({
        type: file.mimetype.startsWith("image/") ? "image" : "video",
        url: uploadResult.secure_url,
      });

      console.log("uploadResult.secure_url: ", uploadResult.secure_url);
    }

    // Create and save the post
    const newPost = new Post({
      media: mediaFiles,
      caption,
      location,
      userId,
    });

    await newPost.save();

    // Handle hashtags
    const hashtags = await processHashtags(caption, newPost._id);
    newPost.hashtags = hashtags;

    // Handle mentions
    const mentions = await processMentions(caption);
    newPost.mentions = mentions;

    await newPost.save();

    console.log("newPost: ", newPost);

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.log("error is ", error);
    res.status(500).json({ message: "Error creating post", error });
  }
};

const extractHashtags = (caption) => {
  const hashtagRegex = /#(\w+)/g;
  const matches = caption.match(hashtagRegex);
  console.log("matches is ", matches);
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
  console.log("Mentions:", matches);
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

    await User.findByIdAndUpdate(user, { $push: { posts: post._id } });

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
      .populate("comments")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    console.log("error is ", err);
    res.status(500).json({ message: "Error while fetching feed posts." });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user").populate("comments");
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

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Fetch posts by the user's ID
    const posts = await Post.find({ user: userId })
      .populate({ path: "user", select: "-password" })
      .populate("comments")
      .sort({ createdAt: -1 });

    // If no posts are found, return a message indicating so
    if (!posts.length) {
      return res.status(404).json({ message: "No posts found for this user." });
    }

    // Return the posts
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching user's posts:", error);
    res.status(500).json({ message: "Internal Server error - getUserPosts" });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the post is already liked by the user
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // Unlike the post by removing the user's ID from the likes array
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      // Like the post by adding the user's ID to the likes array
      post.likes.push(userId);
    }

    // Save the updated post
    const updatedPost = await post.save();

    res.status(200).json({
      message: isLiked ? "Post unLiked" : "Post liked",
      post: updatedPost,
    });
  } catch (error) {
    console.log("Error liking post:", error);
    res.status(500).json({ message: " Internal Server error - Like Post" });
  }
};
