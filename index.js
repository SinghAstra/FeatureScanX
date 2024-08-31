import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { default as mongoose } from "mongoose";
import morgan from "morgan";
import Comment from "./models/Comment.js";
import Post from "./models/Post.js";
import authRoutes from "./routes/auth.js";
import commentsRoutes from "./routes/comments.js";
import messagesRoutes from "./routes/messages.js";
import notificationsRoutes from "./routes/notifications.js";
import postsRoutes from "./routes/posts.js";
import savePostsRoutes from "./routes/savePosts.js";
import usersRoutes from "./routes/users.js";

dotenv.config();

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/saved-post", savePostsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/messages", messagesRoutes);

app.get("/testing/clear-cookies", (req, res) => {
  const cookies = req.cookies;

  for (const cookieName in cookies) {
    if (cookies.hasOwnProperty(cookieName)) {
      res.clearCookie(cookieName);
    }
  }

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

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Database");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB Database");
  });

app.listen(5000, () => {
  console.log("Listening on Port 5000");
});
