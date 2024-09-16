import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    expiration_time: {
      type: Date,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
