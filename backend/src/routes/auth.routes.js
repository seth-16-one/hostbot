const express = require("express");

const {
  register,
  login,
  forgotPassword,
  verifyEmailOtp,
  resendVerification,
  verifyPasswordOtp,
  resendPasswordOtp,
  resetPassword,
  refresh,
  logout,
  me,
} = require("../controllers/auth.controller");

const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.post("/verify-email-otp", verifyEmailOtp);
router.post("/resend-verification", resendVerification);

router.post("/verify-password-otp", verifyPasswordOtp);
router.post("/resend-password-otp", resendPasswordOtp);
router.post("/reset-password", resetPassword);

router.post("/refresh", refresh);
router.post("/logout", requireAuth, logout);

router.get("/me", requireAuth, me);

module.exports = router;
