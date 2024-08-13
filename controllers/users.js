import Post from "../models/Post.js";
import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const currentUserId = req.user.id;

    // Find the user by username
    const user = await User.findOne({ userName: username }).select(
      "-password -dateOfBirth"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const postCount = await Post.countDocuments({ userId: user._id });
    const isFollowing = user.followers.includes(currentUserId);

    res.status(200).json({
      user,
      postCount,
      isFollowing,
    });
  } catch (error) {
    console.log("error.message is ", error.message);
    res.status(500).json({ message: "Server error - getUserProfile" });
  }
};

export const toggleFollow = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    if (userId === currentUserId.toString()) {
      return res.status(400).json({ message: "You cannot follow yourself." });
    }

    const currentUser = await User.findById(currentUserId);
    const userToFollow = await User.findById(userId);

    if (!userToFollow) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user is already following the target user
    const isFollowing = currentUser.following.includes(userId);

    if (isFollowing) {
      // UnFollow the user
      currentUser.following.pull(userId);
      userToFollow.followers.pull(currentUserId);
    } else {
      // Follow the user
      currentUser.following.push(userId);
      userToFollow.followers.push(currentUserId);
    }

    await currentUser.save();
    await userToFollow.save();

    res.status(200).json({
      currentUser,
      userToFollow,
      message: isFollowing
        ? "UnFollowed successfully."
        : "Followed successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error toggling follow status." });
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    const users = await User.deleteMany({});
    res.json({ users, message: "Deleted All Users Successfully" });
  } catch (error) {
    console.log("Error deleting all users ", error);
    return res
      .status(500)
      .json({ message: "Error deleting all users - Internal Server Error." });
  }
};

export const getFollowers = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate({
      path: "followers",
      select: "-password",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ followers: user.followers });
  } catch (error) {
    console.log("Error fetching followers:", error);
    res
      .status(500)
      .json({ message: "Internal Server error - fetching followers" });
  }
};

export const getFollowing = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate({
      path: "following",
      select: "-password",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ following: user.following });
  } catch (error) {
    console.log("Error fetching following:", error);
    res
      .status(500)
      .json({ message: "Internal Server error - fetching following" });
  }
};
