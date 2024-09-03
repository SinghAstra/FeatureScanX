import express from "express";
import { encode } from "../middleware/crypt.js";
import OTP from "../models/OTP.js";
import sendEmail from "../utils/sendEmail.js";
const router = express.Router();

// To add minutes to the current time
function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

router.get("/send-email", async (req, res, next) => {
  try {
    const { email, type } = req.body;
    let email_subject, email_message;

    if (!email || !type) {
      return res.status(400).json({ message: "Missing Email or Type" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 10);

    //Create OTP instance in DB
    const otp_instance = await OTP.create({
      otp: otp,
      expiration_time: expiration_time,
    });

    // Create details object containing the email and otp id
    var details = {
      timestamp: now,
      check: email,
      success: true,
      message: "OTP sent to user",
      otp_id: otp_instance.id,
    };

    // Encrypt the details object
    const encoded = await encode(JSON.stringify(details));

    //Choose message template according type requested const encoded= await encode(JSON.stringify(details))
    let emailModule;
    if (type === "VERIFICATION") {
      emailModule = await import("../templates/email/email_verification.js");
    } else if (type === "FORGET") {
      emailModule = await import("../templates/email/email_forget.js");
    } else if (type === "2FA") {
      emailModule = await import("../templates/email/email_2FA.js");
    } else {
      return res.status(400).json({ message: "Incorrect type provided." });
    }

    email_message = emailModule.message(otp);
    email_subject = emailModule.subject_mail;

    await sendEmail(email, email_subject, email_message);

    res.json({ message: "Email sent successfully", Details: encoded });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
