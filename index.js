import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import { generateMultipleUsers } from "./generators/user.js";
import authRoutes from "./routes/auth.js";
import commentsRoutes from "./routes/comments.js";
import postsRoutes from "./routes/posts.js";
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
app.use("/comments", commentsRoutes);

app.get("/clear-cookies", (req, res) => {
  const cookies = req.cookies;

  for (const cookieName in cookies) {
    if (cookies.hasOwnProperty(cookieName)) {
      res.clearCookie(cookieName);
    }
  }

  res.status(200).json({ message: "All cookies cleared." });
});

app.get("/view-cookies", (req, res) => {
  res.json({ cookies: req.cookies });
});

const populateUsers = async () => {
  try {
    await generateMultipleUsers(100);
    console.log("Users generated successfully.");
  } catch (err) {
    console.log("Error generating users:", err.message);
  }
};

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
