const {
  getUserDeployments,
  getDeployment,
  createDeployment,
  updateDeployment,
  updateDeploymentStatus,
  updateDeploymentPairingSession,
  deleteDeployment,
} = require("../services/deployment.service");
const {
  getPairingSessionStatus,
  requestPairingSession,
} = require("../services/pairing.service");

async function getDeployments(req, res) {
  try {
    const deployments = await getUserDeployments(req.user.id);

    return res.json(deployments);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Failed to load deployments",
    });
  }
}

async function createDeploymentHandler(req, res) {
  try {
    const deployment = await createDeployment(req.user.id, req.body);

    return res.status(201).json(deployment);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Failed to create deployment",
    });
  }
}

async function updateDeploymentHandler(req, res) {
  try {
    const deployment = await updateDeployment(req.user.id, req.params.id, req.body || {});
    if (!deployment) {
      return res.status(404).json({ message: "Deployment not found" });
    }

    return res.json(deployment);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Failed to update deployment",
    });
  }
}

async function getDeploymentHandler(req, res) {
  try {
    let deployment = await getDeployment(req.user.id, req.params.id);
    if (!deployment) {
      return res.status(404).json({ message: "Deployment not found" });
    }

    if (deployment.status === "pairing" && deployment.session?.id) {
      try {
        const session = await getPairingSessionStatus(deployment.session.id);
        if (session.deploymentStatus && session.deploymentStatus !== deployment.status) {
          deployment = await updateDeploymentPairingSession(
            req.user.id,
            deployment.id,
            {
              pairingCode: session.pairingCode ?? deployment.session?.pairCode,
              qr: session.qr ?? deployment.session?.qrValue,
              expiresAt: session.expiresAt ?? deployment.session?.expiresAt,
              sessionId: session.sessionId ?? deployment.session.id,
              status: session.deploymentStatus,
            },
          );
        }
      } catch (error) {
        console.warn(`Pairing status unavailable: ${error.message}`);
      }
    }

    return res.json(deployment);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Failed to load deployment",
    });
  }
}

async function createSessionHandler(req, res) {
  try {
    const deployment = await getDeployment(req.user.id, req.params.id);
    if (!deployment) {
      return res.status(404).json({ message: "Deployment not found" });
    }

    await updateDeploymentStatus(req.user.id, req.params.id, "creating_session");
    const session = await requestPairingSession(deployment);
    await updateDeploymentPairingSession(req.user.id, req.params.id, session);

    return res.status(201).json(session);
  } catch (err) {
    console.error(err);

    return res.status(502).json({
      message: err.message || "Failed to create pairing session",
    });
  }
}

async function statusHandler(req, res, status) {
  try {
    const deployment = await updateDeploymentStatus(req.user.id, req.params.id, status);
    if (!deployment) {
      return res.status(404).json({ message: "Deployment not found" });
    }

    return res.json({ status: deployment.status, deployment });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Failed to update deployment",
    });
  }
}

async function startDeploymentHandler(req, res) {
  return statusHandler(req, res, "deploying");
}

async function deployDeploymentHandler(req, res) {
  return statusHandler(req, res, "online");
}

async function stopDeploymentHandler(req, res) {
  return statusHandler(req, res, "offline");
}

async function restartDeploymentHandler(req, res) {
  return statusHandler(req, res, "deploying");
}

async function deleteDeploymentHandler(req, res) {
  try {
    const deployment = await deleteDeployment(req.user.id, req.params.id);
    if (!deployment) {
      return res.status(404).json({ message: "Deployment not found" });
    }

    return res.json({ status: "deleted" });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Failed to delete deployment",
    });
  }
}

module.exports = {
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
};
