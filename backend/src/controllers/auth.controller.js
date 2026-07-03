const {
  createTokenPair,
  verifyPassword,
  hashPassword,
} = require("../utils/auth.legacy");

const {
  findUserByEmail,
  createUser,
  findUserById,
  updateForgotPasswordOtp,
  updateEmailVerificationOtp,
  findUserByEmailVerificationOtp,
  verifyUserEmail,
  findUserByPasswordOtp,
  updatePassword,
} = require("../services/auth.service");

const { generateOTP, sendOtp } = require("../services/otp.service");

function publicUser(user) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

/*register*/
async function register(req, res) {
  try {
    const { firstName, lastName, email, phone, password } = req.body || {};

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const existingUser = await findUserByEmail(normalizedEmail);

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const user = await createUser({
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      email: normalizedEmail,
      phone: phone || null,
      emailVerified: false,
      passwordHash: hashPassword(password),
    });

    const otp = generateOTP();

    const EMAIL_VERIFICATION_TOKEN_TTL_SECONDS = Number(
      process.env.EMAIL_VERIFICATION_TOKEN_TTL_SECONDS || 600,
    );

    const expiresAt = new Date(
      Date.now() + EMAIL_VERIFICATION_TOKEN_TTL_SECONDS * 1000,
    );

    await updateEmailVerificationOtp(user.id, otp, expiresAt);

    await sendOtp({
      email: user.email,
      name: user.firstName,
      otp,
      subject: "Verify your HostBot account",
      purpose: "Email Verification",
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
      email: user.email,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Registration failed",
    });
  }
}

/*login*/
async function login(req, res) {
  try {
    const { email, password } = req.body || {};

    const loginId = String(email || "")
      .trim()
      .toLowerCase();

    const user = await findUserByEmail(loginId);

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!user.emailVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
      });
    }

    return res.json({
      user: publicUser(user),
      ...createTokenPair(user),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Login failed",
    });
  }
}

/* get me */
async function me(req, res) {

  return res.json({
    user: publicUser(req.user),
  });
}

const { verifyToken } = require("../utils/auth.legacy");

/* Refresh */
async function refresh(req, res) {
  try {
    const { refreshToken } = req.body || {};

    const payload = verifyToken(refreshToken);

    if (!payload || payload.type !== "refresh") {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const user = await findUserById(payload.sub);

    if (!user) {
      return res.status(401).json({
        message: "User session is no longer valid",
      });
    }

    return res.json({
      user: publicUser(user),
      ...createTokenPair(user),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to refresh session",
    });
  }
}

/* logout */
async function logout(req, res) {
  return res.json({
    success: true,
    message: "Logged out successfully",
  });
}

/*forgotPassword*/
async function forgotPassword(req, res) {
  try {
    const { email } = req.body || {};

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await findUserByEmail(normalizedEmail);

    // Don't reveal whether the account exists
    if (!user) {
      return res.json({
        success: true,
        message:
          "If an account exists with that email, a password reset link has been sent.",
      });
    }

    const otp = generateOTP();

    const RESET_PASSWORD_TOKEN_TTL_SECONDS = Number(
      process.env.RESET_PASSWORD_TOKEN_TTL_SECONDS || 3600,
    );

    const expiresAt = new Date(
      Date.now() + RESET_PASSWORD_TOKEN_TTL_SECONDS * 1000,
    );

    await updateForgotPasswordOtp(user.id, otp, expiresAt);

    await sendOtp({
      email: user.email,
      name: user.firstName,
      otp,
      subject: "Reset Your HostBot Password",
      purpose: "Password Reset",
    });

    return res.json({
      success: true,
      message:
        "If an account exists with that email, a password reset link has been sent.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to process request",
    });
  }
}

/* verify email otp */
async function verifyEmailOtp(req, res) {
  try {
    const { email, otp } = req.body || {};

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await findUserByEmailVerificationOtp(
      normalizedEmail,
      String(otp).trim(),
    );

    if (!user) {
      return res.status(400).json({
        message: "Invalid verification code",
      });
    }

    if (
      !user.emailVerificationExpiresAt ||
      user.emailVerificationExpiresAt < new Date()
    ) {
      return res.status(400).json({
        message: "Verification code has expired",
      });
    }

    const verifiedUser = await verifyUserEmail(user.id);

    return res.json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to verify email",
    });
  }
}

/* resend verification */
async function resendVerification(req, res) {
  try {
    const { email } = req.body || {};

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await findUserByEmail(String(email).trim().toLowerCase());

    if (!user) {
      return res.json({
        success: true,
      });
    }

    const otp = generateOTP();

    const expiresAt = new Date(
      Date.now() +
        Number(process.env.EMAIL_VERIFICATION_TOKEN_TTL_SECONDS || 600) * 1000,
    );

    await updateEmailVerificationOtp(user.id, otp, expiresAt);

    await sendOtp({
      email: user.email,
      name: user.firstName,
      otp,
      subject: "Verify your HostBot account",
      purpose: "Email Verification",
    });

    return res.json({
      success: true,
      message: "Verification code sent successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to resend verification code",
    });
  }
}

/* verify password otp */
async function verifyPasswordOtp(req, res) {
  try {
    const { email, otp } = req.body || {};

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const user = await findUserByPasswordOtp(
      String(email).trim().toLowerCase(),
      String(otp).trim(),
    );

    if (!user) {
      return res.status(400).json({
        message: "Invalid verification code",
      });
    }

    if (
      !user.resetPasswordExpiresAt ||
      user.resetPasswordExpiresAt < new Date()
    ) {
      return res.status(400).json({
        message: "Verification code has expired",
      });
    }

    return res.json({
      success: true,
      message: "OTP verified successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to verify OTP",
    });
  }
}

/* reset password */
async function resetPassword(req, res) {
  try {
    const { email, otp, password } = req.body || {};

    if (!email || !otp || !password) {
      return res.status(400).json({
        message: "Email, OTP and password are required",
      });
    }

    const user = await findUserByPasswordOtp(
      String(email).trim().toLowerCase(),
      String(otp).trim(),
    );

    if (!user) {
      return res.status(400).json({
        message: "Invalid verification code",
      });
    }

    if (
      !user.resetPasswordExpiresAt ||
      user.resetPasswordExpiresAt < new Date()
    ) {
      return res.status(400).json({
        message: "Verification code has expired",
      });
    }

    await updatePassword(user.id, hashPassword(password));

    return res.json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to reset password",
    });
  }
}

/* resend password otp */
async function resendPasswordOtp(req, res) {
  try {
    const { email } = req.body || {};

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await findUserByEmail(String(email).trim().toLowerCase());

    if (!user) {
      return res.json({
        success: true,
      });
    }

    const otp = generateOTP();

    const expiresAt = new Date(
      Date.now() +
        Number(process.env.RESET_PASSWORD_TOKEN_TTL_SECONDS || 3600) * 1000,
    );

    await updateForgotPasswordOtp(user.id, otp, expiresAt);

    await sendOtp({
      email: user.email,
      name: user.firstName,
      otp,
      subject: "Reset Your HostBot Password",
      purpose: "Password Reset",
    });

    return res.json({
      success: true,
      message: "Password reset code sent successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to resend password OTP",
    });
  }
}

module.exports = {
  register,
  login,
  verifyEmailOtp,
  resendVerification,
  forgotPassword,
  verifyPasswordOtp,
  resendPasswordOtp,
  resetPassword,
  refresh,
  logout,
  me,
};


