const express = require("express");

const { requireAuth } = require("../middleware/auth.middleware");
const pairingController = require("../controllers/pairing.controller");

const router = express.Router();

router.get("/:sessionId", requireAuth, pairingController.getPairing);

router.post("/:deploymentId/refresh", requireAuth, pairingController.refreshPairing);

module.exports = router;
