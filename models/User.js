import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username must be unique"],
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    email: {
      type: String,
      unique: [true, "Email must be unique"],
      match: [/.+\@.+\..+/, "Invalid email address"],
      validate: {
        validator: function (value) {
          return value || this.mobile;
        },
        message: "Either email or mobile number is required",
      },
    },
    mobile: {
      type: String,
      unique: [true, "Mobile number must be unique"],
      match: [/^[0-9]{10,15}$/, "Invalid mobile number"],
      validate: {
        validator: function (value) {
          return value || this.email;
        },
        message: "Either mobile number or email is required",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      maxlength: [150, "Bio cannot exceed 150 characters"],
    },
    website: {
      type: String,
      match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, "Invalid URL"],
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    location: {
      type: String,
    },
    occupation: {
      type: String,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female"],
        message: "Gender must be one of the following: Male, Female",
      },
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
