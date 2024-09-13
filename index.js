import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
// import http from "http";
import { default as mongoose } from "mongoose";
import morgan from "morgan";
import { Server } from "socket.io";
import Chat from "./models/Chat.js";
import Comment from "./models/Comment.js";
import Post from "./models/Post.js";
import User from "./models/User.js";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";
import commentsRoutes from "./routes/comments.js";
import messagesRoutes from "./routes/messages.js";
import notificationsRoutes from "./routes/notifications.js";
import OTPRoutes from "./routes/OTP.js";
import postsRoutes from "./routes/posts.js";
import savePostsRoutes from "./routes/savePosts.js";
import usersRoutes from "./routes/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ credentials: true, origin: process.env.REMOTE }));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/saved-post", savePostsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/otp", OTPRoutes);

app.get("/", (req, res) => {
  res.json({ message: "🚀 Server is running successfully." });
});
app.get("/testing/set-cookies", (req, res) => {
  res.cookie("verification_key", "updated new value", {
    httpOnly: true,
    maxAge: 10 * 60 * 1000,
  });

  res.status(200).json({ message: "All cookies cleared." });
});
app.get("/testing/view-cookies", (req, res) => {
  res.json({ cookies: req.cookies });
});
app.get("/testing/drop-database", async (req, res) => {
  try {
    await mongoose.connection.dropDatabase();
    res.json({ message: "Database dropped successfully" });
  } catch (error) {
    res.json({ message: "Database dropped successfully" });
  }
});
app.get("/testing/posts", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/testing/comments", async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/testing/delete-all-comments", async (req, res) => {
  try {
    const comments = await Comment.deleteMany({});
    res.json({ comments, message: "Deleted All Comments Successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/delete-me", async (req, res) => {
  const response = await User.findOneAndDelete({
    email: "singhisabhaypratap@gmail.com",
  });
  return res.status(200).json({ message: "deleted", response: response });
});
app.get("/delete-me2", async (req, res) => {
  const response = await User.findOneAndDelete({
    email: "contact.singhastra@gmail.com",
  });
  return res.status(200).json({ message: "deleted", response: response });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Database");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB Database");
  });

const server = app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});

// ============= socket.io ==============

const io = new Server(server, {
  cors: {
    origin: process.env.REMOTE,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let onlineUsers = [];

const addOnlineUser = (userId, socketId) => {
  if (!onlineUsers.some((user) => user.userId === userId)) {
    onlineUsers.push({ userId, socketId });
    console.log(`✅ User added: userId=${userId}, socketId=${socketId}`);
  }
};

const removeOnlineUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  console.log(`⚠️ User removed: socketId=${socketId}`);
};

const getOnlineUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log(`🔗 User connected: socketId=${socket.id}`);

  socket.on("new-online-user", (userId) => {
    addOnlineUser(userId, socket.id);
    console.log(
      `🔔 User added event: userId=${userId}, all users=${JSON.stringify(
        onlineUsers
      )}`
    );
    io.emit("new-online-user", onlineUsers);
  });

  socket.on("new-message", async (message) => {
    try {
      const chat = await Chat.findById(message.chat).populate("participants");
      console.log("chat is ", chat);

      if (!chat) {
        console.log(`❗Chat not found: chatId=${message.chat}`);
        return;
      }

      chat.participants.forEach((participant) => {
        const user = getOnlineUser(participant._id.toString());

        if (user) {
          io.to(user.socketId).emit("new-message", message);
          console.log(
            `✉️  Message sent to: userId=${
              participant._id
            }, message=${JSON.stringify(message)}`
          );
        }
      });
    } catch (error) {
      console.log(`❗Error finding chat or sending message: ${error.message}`);
    }
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: socketId=${socket.id}`);
    removeOnlineUser(socket.id);
    io.emit("getOnlineUsers", onlineUsers);
    console.log(
      `📤 Updated user list after disconnect: ${JSON.stringify(onlineUsers)}`
    );
  });
});
