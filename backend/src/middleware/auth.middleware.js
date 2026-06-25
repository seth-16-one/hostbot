const { verifyToken } = require("../utils/auth.legacy");
const { findUserById } = require("../services/auth.service");

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";

    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const payload = verifyToken(token);

    if (!payload || payload.type !== "access") {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    const user = await findUserById(payload.sub);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Authentication error",
    });
  }
}

module.exports = {
  requireAuth,
};
