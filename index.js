import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Social-API-2.0" });
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
