import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const accessChat = async (req, res) => {
  try {
    const { username } = req.params;
    const userId = req.user.id;

    const receiver = await User.findOne({ userName: username });
    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userId === receiver._id) {
      return res
        .status(400)
        .json({ message: "You cannot chat with yourself." });
    }

    const chat = await Chat.findOne({
      isGroupChat: false,
      participants: { $all: [userId, receiver._id] },
    }).populate("participants", "-password");

    if (chat) {
      return res.json({
        chat,
        receiver: {
          userName: receiver.userName,
          fullName: receiver.fullName,
          profilePicture: receiver.profilePicture,
        },
      });
    }

    const newChat = new Chat({
      participants: [userId, receiver._id],
    });

    await newChat.save();

    return res.status(201).json({
      chat: newChat,
      receiver: {
        userName: receiver.userName,
        fullName: receiver.fullName,
        profilePicture: receiver.profilePicture,
      },
    });
  } catch (error) {
    console.log("error.message is ", error.message);
    return res.status(500).json({ message: error.message });
  }
};
