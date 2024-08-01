import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import streamifier from "streamifier";
import User from "../models/User.js";

// Check if fields exists Check if they are valid data
// Implement forgot password - OTP Handling
// Send Welcome Email
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, location, occupation } =
      req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Missing Credentials." });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already taken." });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    let picturePath = "";

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          { folder: "user_pictures" },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    picturePath = await streamUpload(req.file.buffer);

    console.log("picturePath", picturePath);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    // await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.status(201).json({ message: "Registered successfully." });
  } catch (err) {
    console.log("error is ", err);
    res.status(500).json({ message: "Internal Server Error - Register User." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Email Not Registered." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Logged In Successfully." });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error - LogIn User." });
  }
};

export const deleteAllUser = async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ message: "All Users Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchUserInfoUsingJWTTokenInCookies = async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  const { password, ...userInfo } = user._doc;
  res.status(200).json({ user: userInfo });
};
