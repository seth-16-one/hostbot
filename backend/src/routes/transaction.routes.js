const express = require("express");

const { requireAuth } = require("../middleware/auth.middleware");
const walletController = require("../controllers/wallet.controller");

const router = express.Router();

router.get("/", requireAuth, walletController.getTransactions);

module.exports = router;
