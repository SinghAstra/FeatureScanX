import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error - Fetch Users" });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("friends");

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const { password, ...userInfo } = user._doc;
    res.status(200).json({ user: userInfo });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error - Fetch User Info" });
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
      user: currentUser,
      message: isFollowing
        ? "UnFollowed successfully."
        : "Followed successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error toggling follow status." });
  }
};
