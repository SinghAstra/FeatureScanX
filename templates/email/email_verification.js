export const subject_mail = "OTP: For Email Verification";

export const message = (otp) => {
  return (
    `Dear User, \n\n` +
    "OTP for your email verification is : \n\n" +
    `${otp}\n\n` +
    "This is a auto-generated email. Please do not reply to this email.\n\n" +
    "Regards\n" +
    "SinghAstra\n\n"
  );
};
