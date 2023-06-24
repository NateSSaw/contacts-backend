const { HttpError } = require("../../utils/");

const { User } = require("../../models");
const { sendEmail } = require("../../utils");

require("dotenv").config();

const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(400, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);
  console.log(BASE_URL);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = resendEmail;
