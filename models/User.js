import bcrypt from "bcrypt";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Provide Username"],
      unique: [true, "Username Already Exists"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide password"],
    },
    email: {
      type: String,
      required: [true, "Please Provide Email"],
      unique: [true, "Email Already Exists"],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    mobile: {
      type: String,
      match: [/^\d{10}$/, "Please provide a valid mobile number"],
    },
    address: {
      type: String,
      trim: true,
    },
    profileImage: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("User", UserSchema);
