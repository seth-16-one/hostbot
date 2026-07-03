const express = require("express");

const router = express.Router();

const { requireAuth } = require("../middleware/auth.middleware");
const walletController = require("../controllers/wallet.controller");

router.get("/", requireAuth, walletController.getWallet);

router.get("/packages", requireAuth, walletController.getPackages);

router.get("/transactions", requireAuth, walletController.getTransactions);

router.post("/recharge", requireAuth, walletController.createRecharge);

router.post("/recharge/:id/verify", requireAuth, walletController.verifyRecharge);

module.exports = router;
