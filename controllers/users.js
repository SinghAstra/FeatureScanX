import User from "../models/User.js";

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
