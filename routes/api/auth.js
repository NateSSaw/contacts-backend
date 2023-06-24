const express = require("express");
const user = require("../../controlers/users");
const {
  authSchema,
  updateSubscriptionSchema,
  emailVerify,
} = require("../../schemas");
const { authenticate, upload } = require("../../middlewares");
const { validateBody } = require("../../decorators");

const router = express.Router();

router.post("/register", validateBody(authSchema), user.signup);

router.get("/verify/:verificationToken", user.verifyEmail);

router.post("/verify", validateBody(emailVerify), user.resendEmail);

router.post("/login", validateBody(authSchema), user.signin);

router.get("/current", authenticate, user.current);

router.post("/logout", authenticate, user.logout);

router.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  user.updateSubscritionType
);

router.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  user.updateUserAvatar
);

module.exports = { router };
