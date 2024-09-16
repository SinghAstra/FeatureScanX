export const subject_mail = "Reset Password";

export const html_mail = (token) => {
  return `<h1>Reset Your Password</h1>
    <p>Click on the following link to reset your password:</p>
    <a href="http://localhost:3000/accounts/password/reset/confirm/${token}">Reset Password</a>
    <p>The link will expire in 10 minutes.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>`;
};
