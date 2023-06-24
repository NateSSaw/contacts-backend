const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const { HttpError } = require("../../utils");
const gravatar = require("gravatar");
const shortid = require("shortid");
const sendEmail = require("../../utils/sendEmail");

const { BASE_URL } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const verificationToken = shortid();

  const avatarURL = await gravatar.url(req.body.email, {
    protocol: "http",
    s: "200",
  });
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);
  console.log("send success");

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = signup;
