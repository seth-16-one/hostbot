const {
  createTokenPair,
  verifyPassword,
  hashPassword,
} = require("../utils/auth.legacy");

const { findUserByEmail, createUser } = require("../services/auth.service");

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

    return res.status(201).json({
      user: publicUser(user),
      ...createTokenPair(user),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Registration failed",
    });
  }
}

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

async function me(req, res) {
  console.log("✅ /me endpoint reached");

  return res.json({
    user: publicUser(req.user),
  });
}

module.exports = {
  register,
  login,
  me,
};
