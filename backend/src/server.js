require("dotenv").config();

const crypto = require("crypto");
const cors = require("cors");
const express = require("express");
const {
  createTokenPair,
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./utils/auth.legacy");

const { readDb, updateDb } = require("./config/database");
const prisma = require("./config/prisma");
const { findUserByEmail, findUserById } = require("./services/auth.service");

const app = express();
const port = Number(process.env.BACKEND_PORT || 3001);

app.use(cors());
app.use(express.json());

function id(prefix) {
  return `${prefix}_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    firstName: user.firstName || user.name?.split(" ")[0] || "",
    lastName: user.lastName || user.name?.split(" ").slice(1).join(" ") || "",
    email: user.email,
    phone: user.phone || "",
    emailVerified: Boolean(user.emailVerified),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const payload = verifyToken(token);

  if (!payload || payload.type !== "access") {
    return res.status(401).json({ message: "Authentication required" });
  }

  const db = readDb();
  const user = db.users.find((item) => item.id === payload.sub);
  if (!user) {
    return res.status(401).json({ message: "User session is no longer valid" });
  }

  req.user = user;
  next();
}

function ensureWallet(db, userId) {
  let wallet = db.wallets.find((item) => item.userId === userId);
  if (!wallet) {
    wallet = {
      userId,
      credits: 450,
      updatedAt: new Date().toISOString(),
    };
    db.wallets.push(wallet);
  }
  return wallet;
}

function seedDemoUser() {
  updateDb((db) => {
    const existing = db.users.find(
      (user) => user.email === "demo@hostbot.local",
    );
    if (existing) {
      let changed = false;
      const assign = (key, value) => {
        if (existing[key] !== value) {
          existing[key] = value;
          changed = true;
        }
      };

      assign("firstName", "Demo");
      assign("lastName", "User");
      assign("name", "Demo User");
      assign("phone", "+254700000000");
      assign("emailVerified", true);
      if (!verifyPassword("password123", existing.passwordHash)) {
        existing.passwordHash = hashPassword("password123");
        changed = true;
      }
      if (changed) {
        existing.updatedAt = new Date().toISOString();
      }
      return;
    }
    const now = new Date().toISOString();
    const user = {
      id: id("usr"),
      firstName: "Demo",
      lastName: "User",
      name: "Demo User",
      email: "demo@hostbot.local",
      phone: "+254700000000",
      emailVerified: true,
      passwordHash: hashPassword("password123"),
      createdAt: now,
      updatedAt: now,
    };
    db.users.push(user);
    ensureWallet(db, user.id);
    db.transactions.push({
      id: id("txn"),
      userId: user.id,
      type: "credit",
      status: "completed",
      amount: 450,
      description: "Demo wallet opening balance",
      reference: "DEMO-SEED",
      createdAt: now,
    });
  });
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "hostbot-backend" });
});

function createEmailToken() {
  return crypto.randomBytes(24).toString("hex");
}

function sendAuthSession(res, user, status = 200) {
  res.status(status).json({
    user: publicUser(user),
    ...createTokenPair(user),
  });
}

app.post("/api/auth/register", (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body || {};
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    password.length < 8
  ) {
    return res.status(400).json({
      message:
        "First name, last name, email, phone, and an 8+ character password are required",
    });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const result = updateDb((db) => {
    if (db.users.some((user) => user.email === normalizedEmail)) {
      return { error: "Email is already registered" };
    }

    const now = new Date().toISOString();
    const user = {
      id: id("usr"),
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      name: `${String(firstName).trim()} ${String(lastName).trim()}`,
      email: normalizedEmail,
      phone: String(phone).trim(),
      emailVerified: false,
      emailVerificationToken: createEmailToken(),
      passwordHash: hashPassword(password),
      createdAt: now,
      updatedAt: now,
    };
    db.users.push(user);
    ensureWallet(db, user.id);
    return { user };
  });

  if (result.error) {
    return res.status(409).json({ message: result.error });
  }

  sendAuthSession(res, result.user, 201);
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};

  const loginId = String(email || "")
    .trim()
    .toLowerCase();

  const user = await findUserByEmail(loginId);

  console.log(user);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  sendAuthSession(res, user);
});

app.post("/api/auth/logout", requireAuth, (_req, res) => {
  res.json({ success: true });
});

app.post("/api/auth/refresh", (req, res) => {
  const { refreshToken } = req.body || {};
  const payload = verifyToken(refreshToken);
  if (!payload || payload.type !== "refresh") {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  const user = readDb().users.find((item) => item.id === payload.sub);
  if (!user) {
    return res.status(401).json({ message: "User session is no longer valid" });
  }

  sendAuthSession(res, user);
});

app.post("/api/auth/google", (req, res) => {
  const { idToken } = req.body || {};
  if (!idToken) {
    return res.status(400).json({ message: "Google ID token is required" });
  }

  const result = updateDb((db) => {
    const now = new Date().toISOString();
    const email = `google-${crypto.createHash("sha1").update(idToken).digest("hex").slice(0, 10)}@google.local`;
    let user = db.users.find((item) => item.email === email);
    if (!user) {
      user = {
        id: id("usr"),
        firstName: "Google",
        lastName: "User",
        name: "Google User",
        email,
        phone: "",
        emailVerified: true,
        provider: "google",
        passwordHash: "",
        createdAt: now,
        updatedAt: now,
      };
      db.users.push(user);
      ensureWallet(db, user.id);
    }
    return user;
  });

  sendAuthSession(res, result);
});

app.post("/api/auth/forgot-password", (req, res) => {
  const { email } = req.body || {};
  const normalizedEmail = String(email || "")
    .trim()
    .toLowerCase();
  updateDb((db) => {
    const user = db.users.find((item) => item.email === normalizedEmail);
    if (user) {
      user.resetPasswordToken = createEmailToken();
      user.resetPasswordExpiresAt = new Date(
        Date.now() + 60 * 60 * 1000,
      ).toISOString();
      user.updatedAt = new Date().toISOString();
    }
  });
  res.json({ success: true });
});

app.post("/api/auth/reset-password", (req, res) => {
  const { token, password } = req.body || {};
  if (!token || !password || password.length < 8) {
    return res
      .status(400)
      .json({ message: "Valid token and password are required" });
  }

  const result = updateDb((db) => {
    const user = db.users.find(
      (item) =>
        item.resetPasswordToken === token &&
        item.resetPasswordExpiresAt &&
        new Date(item.resetPasswordExpiresAt).getTime() > Date.now(),
    );
    if (!user) return { error: "Reset token is invalid or expired" };
    user.passwordHash = hashPassword(password);
    delete user.resetPasswordToken;
    delete user.resetPasswordExpiresAt;
    user.updatedAt = new Date().toISOString();
    return { user };
  });

  if (result.error) return res.status(400).json({ message: result.error });
  res.json({ success: true });
});

app.post("/api/auth/verify-email", (req, res) => {
  const { token } = req.body || {};
  const result = updateDb((db) => {
    const user = db.users.find((item) => item.emailVerificationToken === token);
    if (!user) return { error: "Verification token is invalid" };
    user.emailVerified = true;
    delete user.emailVerificationToken;
    user.updatedAt = new Date().toISOString();
    return { user };
  });
  if (result.error) return res.status(400).json({ message: result.error });
  res.json({ success: true });
});

app.post("/api/auth/resend-verification", (req, res) => {
  const { email } = req.body || {};
  const normalizedEmail = String(email || "")
    .trim()
    .toLowerCase();
  updateDb((db) => {
    const user = db.users.find((item) => item.email === normalizedEmail);
    if (user && !user.emailVerified) {
      user.emailVerificationToken = createEmailToken();
      user.updatedAt = new Date().toISOString();
    }
  });
  res.json({ success: true });
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

app.put("/api/auth/me", requireAuth, (req, res) => {
  const { firstName, lastName, phone } = req.body || {};
  const updated = updateDb((db) => {
    const user = db.users.find((item) => item.id === req.user.id);
    user.firstName = String(firstName || user.firstName || "").trim();
    user.lastName = String(lastName || user.lastName || "").trim();
    user.name = `${user.firstName} ${user.lastName}`.trim();
    user.phone = String(phone || user.phone || "").trim();
    user.updatedAt = new Date().toISOString();
    return user;
  });
  res.json({ user: publicUser(updated) });
});

app.get("/api/bots", requireAuth, (_req, res) => {
  res.json(readDb().bots);
});

app.get("/api/bots/:id", requireAuth, (req, res) => {
  const bot = readDb().bots.find((item) => item.id === Number(req.params.id));
  if (!bot) {
    return res.status(404).json({ message: "Bot not found" });
  }
  res.json(bot);
});

app.get("/api/deployments", requireAuth, (req, res) => {
  const db = readDb();
  console.log("LOGIN EMAIL:", loginId);
  console.log("USERS IN JSON DB:", db.users.length);
  console.log("FOUND USER:", user);
  res.json(db.deployments.filter((item) => item.userId === req.user.id));
});

app.post("/api/deployments", requireAuth, (req, res) => {
  const { botId, botName, ownerNumber, prefix, sessionName } = req.body || {};
  const created = updateDb((db) => {
    const bot = db.bots.find((item) => item.id === Number(botId));
    if (!bot) {
      return { error: "Bot not found" };
    }
    const now = new Date().toISOString();
    const deployment = {
      id: id("dep"),
      userId: req.user.id,
      botId: bot.id,
      botName: botName || bot.name,
      ownerNumber: ownerNumber || "",
      prefix: prefix || bot.deploymentConfig.defaultPrefix,
      sessionName:
        sessionName ||
        `${bot.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      status: "queued",
      createdAt: now,
      updatedAt: now,
    };
    db.deployments.unshift(deployment);
    return { deployment };
  });

  if (created.error) {
    return res.status(404).json({ message: created.error });
  }
  res.status(201).json(created.deployment);
});

app.post("/api/deployments/:id/session", requireAuth, (req, res) => {
  const result = updateDb((db) => {
    const deployment = db.deployments.find(
      (item) => item.id === req.params.id && item.userId === req.user.id,
    );
    if (!deployment) return { error: "Deployment not found" };
    const now = new Date();
    const pairCode = crypto.randomBytes(4).toString("hex").toUpperCase();
    deployment.status = "pairing";
    deployment.session = {
      id: id("ses"),
      deploymentId: deployment.id,
      pairCode,
      qrValue: `hostbot://pair/${deployment.id}?code=${pairCode}`,
      expiresAt: new Date(now.getTime() + 5 * 60 * 1000).toISOString(),
      createdAt: now.toISOString(),
    };
    deployment.updatedAt = now.toISOString();
    return { session: deployment.session };
  });
  if (result.error) return res.status(404).json({ message: result.error });
  res.status(201).json(result.session);
});

app.post("/api/deployments/:id/pair", requireAuth, (req, res) => {
  const result = setDeploymentStatus(req.params.id, req.user.id, "deploying");
  if (result.error) return res.status(404).json({ message: result.error });
  res.json({ status: result.deployment.status });
});

app.post("/api/deployments/:id/deploy", requireAuth, (req, res) => {
  const result = setDeploymentStatus(req.params.id, req.user.id, "online");
  if (result.error) return res.status(404).json({ message: result.error });
  res.json({ status: result.deployment.status });
});

app.post("/api/deployments/:id/restart", requireAuth, (req, res) => {
  const result = setDeploymentStatus(req.params.id, req.user.id, "online");
  if (result.error) return res.status(404).json({ message: result.error });
  res.json({ status: result.deployment.status });
});

app.post("/api/deployments/:id/stop", requireAuth, (req, res) => {
  const result = setDeploymentStatus(req.params.id, req.user.id, "offline");
  if (result.error) return res.status(404).json({ message: result.error });
  res.json({ status: result.deployment.status });
});

app.delete("/api/deployments/:id", requireAuth, (req, res) => {
  const result = setDeploymentStatus(req.params.id, req.user.id, "suspended");
  if (result.error) return res.status(404).json({ message: result.error });
  res.json({ status: result.deployment.status });
});

app.get("/api/deployments/:id/status", requireAuth, (req, res) => {
  const deployment = readDb().deployments.find(
    (item) => item.id === req.params.id && item.userId === req.user.id,
  );
  if (!deployment)
    return res.status(404).json({ message: "Deployment not found" });
  res.json({ status: deployment.status });
});

function setDeploymentStatus(deploymentId, userId, status) {
  return updateDb((db) => {
    const deployment = db.deployments.find(
      (item) => item.id === deploymentId && item.userId === userId,
    );
    if (!deployment) return { error: "Deployment not found" };
    deployment.status = status;
    deployment.updatedAt = new Date().toISOString();
    return { deployment };
  });
}

app.get("/api/wallet/packages", requireAuth, (_req, res) => {
  res.json(readDb().rechargePackages);
});

app.get("/api/wallet/balance", requireAuth, (req, res) => {
  const wallet = updateDb((db) => ensureWallet(db, req.user.id));
  res.json({ credits: wallet.credits, updatedAt: wallet.updatedAt });
});

app.get("/api/wallet/transactions", requireAuth, (req, res) => {
  const db = readDb();
  res.json(db.transactions.filter((item) => item.userId === req.user.id));
});

app.post("/api/wallet/recharge", requireAuth, (req, res) => {
  const { packageId, method } = req.body || {};
  const result = updateDb((db) => {
    const selected = db.rechargePackages.find((item) => item.id === packageId);
    if (!selected) return { error: "Recharge package not found" };
    const recharge = {
      id: id("rch"),
      userId: req.user.id,
      status: "pending",
      amount: selected.price,
      credits: selected.credits + (selected.bonusCredits || 0),
      paymentMethod: method || "mpesa",
      createdAt: new Date().toISOString(),
    };
    db.recharges.unshift(recharge);
    return { recharge };
  });
  if (result.error) return res.status(404).json({ message: result.error });
  res.status(201).json(result.recharge);
});

app.post("/api/wallet/recharge/:id/verify", requireAuth, (req, res) => {
  const result = updateDb((db) => {
    const recharge = db.recharges.find(
      (item) => item.id === req.params.id && item.userId === req.user.id,
    );
    if (!recharge) return { error: "Recharge not found" };
    if (recharge.status !== "completed") {
      recharge.status = "completed";
      const wallet = ensureWallet(db, req.user.id);
      wallet.credits += recharge.credits;
      wallet.updatedAt = new Date().toISOString();
      db.transactions.unshift({
        id: id("txn"),
        userId: req.user.id,
        type: "credit",
        status: "completed",
        amount: recharge.credits,
        description: "Wallet recharge",
        reference: recharge.id,
        createdAt: new Date().toISOString(),
      });
    }
    return { recharge };
  });
  if (result.error) return res.status(404).json({ message: result.error });
  res.json(result.recharge);
});

seedDemoUser();

app.listen(port, () => {
  console.log(`Host Bot backend running on port ${port}`);
  console.log("Demo login: demo@hostbot.local / password123");
});
