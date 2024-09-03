export const subject_mail = "OTP: For Reset Password";

export const message = (otp) => {
  return (
    `Dear User, \n\n` +
    "OTP for Reset Password is : \n\n" +
    `${otp}\n\n` +
    "This is a auto-generated email. Please do not reply to this email.\n\n" +
    "Regards\n" +
    "SinghAstra\n\n"
  );
};
