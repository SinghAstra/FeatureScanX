import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";
import streamifier from "streamifier";
import { fileURLToPath } from "url";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Check if email, mobile, or username is taken
export const checkAvailabilityController = async (req, res) => {
  const { mobileOrEmail, username } = req.body;

  try {
    let user;
    if (mobileOrEmail) {
      user = await User.findOne({
        $or: [{ email: mobileOrEmail }, { mobile: mobileOrEmail }],
      });
    }
    if (username) {
      user = await User.findOne({ username });
    }

    if (user) {
      return res.status(200).json({ isAvailable: false });
    } else {
      return res.status(200).json({ isAvailable: true });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error - checkAvailability" });
  }
};

export const sendConfirmationCodeController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Generate 6-digit OTP
    const confirmationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const templatePath = path.resolve(
      __dirname,
      "../email-templates/confirmation-code.html"
    );
    let html = fs.readFileSync(templatePath, "utf8");

    html = html.replace(/{{email}}/g, email);
    html = html.replace(/{{confirmationCode}}/g, confirmationCode);

    // Send email
    await sendEmail({
      email: email,
      subject: `${confirmationCode} is your Social code`,
      html: html,
    });

    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.log("error.message is ", error.message);
    res.status(500).json({ message: "Error sending email" });
  }
};

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

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath: picturePath.url,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "72h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 72 * 3600 * 1000,
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "72h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 72 * 3600 * 1000,
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

  console.log("userId is ", userId);

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  const { password, ...userInfo } = user._doc;
  res.status(200).json({ user: userInfo });
};
