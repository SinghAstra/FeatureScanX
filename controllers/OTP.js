import { encode } from "../middleware/crypt.js";
import OTP from "../models/OTP.js";
import sendEmail from "../utils/sendEmail.js";

function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

export const sendEmailController = async (req, res, next) => {
  try {
    const { email, type } = req.body;
    let email_subject, email_message;

    if (!email || !type) {
      return res.status(400).json({ message: "Missing Email or Type" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 10);

    const otp_instance = await OTP.create({
      otp: otp,
      expiration_time: expiration_time,
    });

    var details = {
      timestamp: now,
      check: email,
      success: true,
      message: "OTP sent to user",
      otp_id: otp_instance.id,
    };

    const encoded = await encode(JSON.stringify(details));
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
};

export const verifyOTP = async (req, res) => {
  try {
    const currentDate = new Date();
    const { verification_key, otp, check } = req.body;

    if (!verification_key || !otp || !check) {
      return res.status(400).json({ message: "Missing Credentials." });
    }

    const decoded = await decode(verification_key);
    const obj = JSON.parse(decoded);
    const check_obj = obj.check;

    if (check_obj !== check) {
      return res.status(400).json({
        message: "OTP was not sent to this particular email or phone number",
      });
    }

    const otp_instance = await OTP.findById(obj.otp_id);

    if (otp_instance != null) {
      if (!otp_instance.verified) {
        if (currentDate <= otp_instance.expiration_time) {
          if (otp === otp_instance.otp) {
            otp_instance.verified = true;
            await otp_instance.save();
            return res.status(200).json({
              message: "OTP Matched",
              Check: check,
            });
          } else {
            return res.status(400).json({ message: "OTP NOT Matched" });
          }
        } else {
          return res.status(400).json({ message: "OTP Expired" });
        }
      } else {
        return res.status(400).json({ message: "OTP Already Used" });
      }
    } else {
      return res.status(400).json({ message: "Bad Request" });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
