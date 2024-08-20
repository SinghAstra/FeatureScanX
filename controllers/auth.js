import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Check if email, mobile, or username is taken
export const checkAvailabilityController = async (req, res) => {
  const { email, username } = req.body;

  try {
    let user;
    if (email) {
      user = await User.findOne({
        email,
      });
    }
    if (username) {
      user = await User.findOne({ userName: username });
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

export const verifyEmailController = async (req, res) => {
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

    res.status(200).json({ message: "Email sent", confirmationCode });
  } catch (error) {
    console.log("error.message is ", error.message);
    res.status(500).json({ message: "Error sending email" });
  }
};

export const registerUserController = async (req, res) => {
  try {
    const { fullName, username, email, password, dateOfBirth } = req.body;

    // Check if a user with the provided email or mobile already exists
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

    console.log("newUser is ", newUser);

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
    console.log("error is ", error);
    res
      .status(500)
      .json({ message: "Internal server error --registerUserController" });
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
    console.log("Logged in successfully");
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
  res.status(200).json({ isAuthenticated: true, user: userInfo });
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
