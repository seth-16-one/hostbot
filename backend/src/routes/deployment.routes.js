const express = require("express");

const { requireAuth } = require("../middleware/auth.middleware");

const {
  getDeployments,
  getDeploymentHandler,
  createDeploymentHandler,
  updateDeploymentHandler,
  createSessionHandler,
  deployDeploymentHandler,
  startDeploymentHandler,
  stopDeploymentHandler,
  restartDeploymentHandler,
  deleteDeploymentHandler,
} = require("../controllers/deployment.controller");

const router = express.Router();

router.get("/", requireAuth, getDeployments);

router.post("/", requireAuth, createDeploymentHandler);

router.get("/:id", requireAuth, getDeploymentHandler);

router.put("/:id", requireAuth, updateDeploymentHandler);

router.post("/:id/session", requireAuth, createSessionHandler);

router.post("/:id/deploy", requireAuth, deployDeploymentHandler);

router.post("/:id/start", requireAuth, startDeploymentHandler);

router.post("/:id/stop", requireAuth, stopDeploymentHandler);

router.post("/:id/restart", requireAuth, restartDeploymentHandler);

router.delete("/:id", requireAuth, deleteDeploymentHandler);

module.exports = router;
