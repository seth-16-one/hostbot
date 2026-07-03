const {
  getDeployment,
  updateDeploymentStatus,
  updateDeploymentPairingSession,
  clearDeploymentPairingSession,
} = require("../services/deployment.service");
const {
  deletePairingSession,
  getPairingSessionStatus,
  requestPairingSession,
} = require("../services/pairing.service");

async function getPairing(req, res, next) {
  try {
    const session = await getPairingSessionStatus(req.params.sessionId);
    return res.json(session);
  } catch (error) {
    next(error);
  }
}

async function refreshPairing(req, res, next) {
  try {
    const deployment = await getDeployment(req.user.id, req.params.deploymentId);
    if (!deployment) return res.status(404).json({ message: "Deployment not found" });

    if (deployment.session?.id) {
      await deletePairingSession(deployment.session.id);
      await clearDeploymentPairingSession(req.user.id, deployment.id);
    }

    await updateDeploymentStatus(req.user.id, deployment.id, "creating_session");
    const session = await requestPairingSession(deployment);
    await updateDeploymentPairingSession(req.user.id, deployment.id, session);

    return res.status(201).json(session);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPairing,
  refreshPairing,
};
