const express = require("express");

const authRoutes = require("./auth.routes");
const botRoutes = require("./bot.routes");
const deploymentRoutes = require("./deployment.routes");
const pairingRoutes = require("./pairing.routes");
const transactionRoutes = require("./transaction.routes");
const walletRoutes = require("./wallet.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/bots", botRoutes);
router.use("/deployments", deploymentRoutes);
router.use("/pair", pairingRoutes);
router.use("/transactions", transactionRoutes);
router.use("/wallet", walletRoutes);

module.exports = router;
