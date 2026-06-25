const crypto = require("crypto");

const ACCESS_TOKEN_TTL_SECONDS = 60 * 15;
const REFRESH_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 30;

function base64Url(input) {
  return Buffer.from(input).toString("base64url");
}

function sign(value) {
  return crypto
    .createHmac("sha256", process.env.AUTH_SECRET || "hostbot-dev-secret")
    .update(value)
    .digest("base64url");
}

function createToken(user, type = "access") {
  const payload = {
    sub: user.id,
    email: user.email,
    type,
    exp:
      Math.floor(Date.now() / 1000) +
      (type === "refresh" ? REFRESH_TOKEN_TTL_SECONDS : ACCESS_TOKEN_TTL_SECONDS),
  };
  const encoded = base64Url(JSON.stringify(payload));
  return `${encoded}.${sign(encoded)}`;
}

function createTokenPair(user) {
  return {
    accessToken: createToken(user, "access"),
    refreshToken: createToken(user, "refresh"),
  };
}

function verifyToken(token) {
  const [encoded, signature] = String(token || "").split(".");
  if (!encoded || !signature || sign(encoded) !== signature) {
    return null;
  }

  const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }
  return payload;
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.pbkdf2Sync(password, salt, 120000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  const [salt, hash] = String(storedHash || "").split(":");
  if (!salt || !hash) {
    return false;
  }
  return hashPassword(password, salt) === storedHash;
}

module.exports = {
  createToken,
  createTokenPair,
  hashPassword,
  verifyPassword,
  verifyToken,
};
