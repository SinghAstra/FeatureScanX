import Chat from "../models/Chat.js";

export const accessChat = async (req, res) => {
  try {
    const userId = req.user.id;
    const { receiverId } = req.body;

    const chat = await Chat.findOne({
      isGroupChat: false,
      participants: { $all: [userId, receiverId] },
    }).populate("participants", "-password");

    if (chat) {
      return res.json(chat);
    }

    const newChat = new Chat({
      participants: [userId, receiverId],
    });

    await newChat.save();

    return res.status(201).json(newChat);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
