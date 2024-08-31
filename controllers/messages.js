import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  const { chatId, content } = req.body;

  if (!chatId || !content) {
    return res
      .status(400)
      .json({ message: "Chat ID and message content are required." });
  }

  try {
    const newMessage = await Message.create({
      chat: chatId,
      sender: req.user.id,
      content,
    });

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { lastMessage: newMessage._id },
      { new: true }
    ).populate({
      path: "lastMessage",
      select: "content sender createdAt",
      populate: {
        path: "sender",
        select: "userName fullName profilePicture",
      },
    });

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found." });
    }

    res.status(200).json({ message: newMessage, chat: updatedChat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChatMessages = async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) {
    return res.status(400).json({ message: "Chat ID is required." });
  }

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found." });
    }

    const messages = await Message.find({ chat: chatId })
      .populate({
        path: "sender",
        select: "userName fullName profilePicture",
      })
      .sort({ createdAt: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
