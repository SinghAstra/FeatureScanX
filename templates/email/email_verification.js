export const subject_mail = "OTP: For Email Verification";

export const html_mail = (otp) => {
  return `<p>Dear User,</p>
    <p>OTP for your email verification is:</p>
    <h2>${otp}</h2>
    <p>This is an auto-generated email. Please do not reply to this email.</p>
    <br>
    <p>Regards,<br>SinghAstra</p>`;
};
