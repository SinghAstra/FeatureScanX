import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js";
import { html_mail, subject_mail } from "../templates/email/email_forget.js";
import sendEmail from "../utils/sendEmail.js";

export const checkUserExists = async (req, res) => {
  try {
    const { identifier } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let query = {};

    if (emailRegex.test(identifier)) {
      query = { email: identifier };
    } else {
      query = { userName: identifier };
    }

    const user = await User.findOne(query);

    if (user) {
      return res.json({ exists: true });
    }

    return res.json({ exists: false });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      controller: checkUserExists,
    });
  }
};

export const registerUserController = async (req, res) => {
  try {
    const { fullName, username, email, password, dateOfBirth } = req.body;

    if (!fullName || !username || !email || !password || !dateOfBirth) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if a user with the username already exists
    const existingUsername = await User.findOne({ userName: username });

    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      fullName,
      userName: username,
      email: email,
      password: hashedPassword,
      dateOfBirth: new Date(
        dateOfBirth.year,
        dateOfBirth.month - 1,
        dateOfBirth.day
      ),
    });

    // Save the user to the database
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "72h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 72 * 3600 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.userName,
        email: newUser.email,
        mobile: newUser.mobile,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, controller: registerUserController });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "Identifier (email or username) and password are required.",
      });
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

    let user;
    if (isEmail) {
      user = await User.findOne({ email: identifier });
    } else {
      user = await User.findOne({ userName: identifier });
    }

    if (!user) {
      return res
        .status(400)
        .json({ message: "Identifier (email or username) not registered." });
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
    console.log("Logged in successfully");
    res.status(200).json({ message: "Logged In Successfully." });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error - LogIn User." });
  }
};

export const fetchUserInfoUsingJWTTokenInCookies = async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  const { password, ...userInfo } = user._doc;
  res.status(200).json({ isAuthenticated: true, user: userInfo });
};

export const forgetPassword = async (req, res) => {
  try {
    const { identifier } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let query = {};

    if (emailRegex.test(identifier)) {
      query = { email: identifier };
    } else {
      query = { userName: identifier };
    }

    const user = await User.findOne(query);

    if (!user) {
      return res.json({ exists: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    await sendEmail(user.email, subject_mail, html_mail(token));

    res.json({
      message: "Email sent successfully",
      token: token,
      exists: true,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      controller: forgetPassword,
    });
  }
};

export const fetchUserInfoUsingForgotPasswordJWTToken = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select(
      "userName profilePicture fullName"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      userName: user.userName,
      profilePicture: user.profilePicture,
      fullName: user.fullName,
    });
  } catch (error) {
    res.status(500).json({ message: "Invalid token or error fetching user" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    const loginToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "72h",
    });

    res.cookie("token", loginToken, {
      httpOnly: true,
      maxAge: 72 * 3600 * 1000,
    });

    res.json({
      message:
        "Password reset successful. Please log in with your new password.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, controller: resetPassword });
  }
};

// Uploading Profile Picture to cloudinary

// let picturePath = "";

// const streamUpload = (fileBuffer) => {
//   return new Promise((resolve, reject) => {
//     let stream = cloudinary.uploader.upload_stream(
//       { folder: "user_pictures" },
//       (error, result) => {
//         if (result) {
//           resolve(result);
//         } else {
//           reject(error);
//         }
//       }
//     );
//     streamifier.createReadStream(fileBuffer).pipe(stream);
//   });
// };

// picturePath = await streamUpload(req.file.buffer);
