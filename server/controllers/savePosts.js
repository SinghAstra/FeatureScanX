import User from "../models/User.js";

export const toggleSavePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const postIndex = user.savedPosts.indexOf(postId);

    if (postIndex === -1) {
      // Post is not saved, save it
      user.savedPosts.push(postId);
      await user.save();

      return res
        .status(200)
        .json({
          message: "Post saved successfully",
          savedPosts: user.savedPosts,
        });
    } else {
      // Post is saved, un-save it
      user.savedPosts.splice(postIndex, 1);
      await user.save();

      res
        .status(200)
        .json({
          message: "Post removed from saved posts",
          savedPosts: user.savedPosts,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, controller: toggleSavePost });
  }
};
