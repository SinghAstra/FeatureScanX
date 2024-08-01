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

export const addRemoveFriend = async (req, res) => {
  try {
    const { friendId } = req.params;
    const id = req.user.id;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User Not Found" });
    }

    if (id === friendId) {
      return res
        .status(400)
        .json({ message: "Cannot add/remove yourself as a friend" });
    }

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const updatedUser = await User.findById(id).populate("friends");

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
