const express = require("express");

const { getBots, getBot } = require("../controllers/bot.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", requireAuth, getBots);

router.get("/:id", requireAuth, getBot);

module.exports = router;