import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./database/db.js";
dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Social-API-2.0" });
});

connectDB();

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
