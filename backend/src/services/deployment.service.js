const prisma = require("../config/prisma");

function toIso(value) {
  return value?.toISOString ? value.toISOString() : value;
}

function serializeDeployment(deployment) {
  if (!deployment) return null;

  const { pairingSessionId, pairingCode, qr, expiresAt, ...rest } = deployment;

  return {
    ...rest,
    session:
      pairingSessionId || pairingCode || qr || expiresAt
        ? {
            id: pairingSessionId || deployment.id,
            deploymentId: deployment.id,
            pairCode: pairingCode,
            qrValue: qr,
            expiresAt: toIso(expiresAt),
            createdAt: toIso(deployment.updatedAt),
            status: deployment.status,
          }
        : undefined,
  };
}

async function getUserDeployments(userId) {
  const deployments = await prisma.deployment.findMany({
    where: { userId },
    include: { bot: true },
    orderBy: { createdAt: "desc" },
  });

  return deployments.map(serializeDeployment);
}

async function getDeployment(userId, deploymentId) {
  const deployment = await prisma.deployment.findFirst({
    where: { id: deploymentId, userId },
    include: { bot: true },
  });

  return serializeDeployment(deployment);
}

async function createDeployment(userId, data) {
  const deployment = await prisma.deployment.create({
    data: {
      userId,
      botId: data.botId,
      botName: data.botName,
      ownerNumber: data.ownerNumber,
      prefix: data.prefix,
      sessionName: data.sessionName,
      status: "queued",
    },
  });

  await prisma.bot.update({
    where: { id: data.botId },
    data: { totalDeployments: { increment: 1 } },
  });

  return serializeDeployment(deployment);
}

async function updateDeployment(userId, deploymentId, data) {
  const deployment = await getDeployment(userId, deploymentId);
  if (!deployment) return null;

  const updated = await prisma.deployment.update({
    where: { id: deploymentId },
    data: {
      botName: data.botName ?? undefined,
      ownerNumber: data.ownerNumber ?? undefined,
      prefix: data.prefix ?? undefined,
      sessionName: data.sessionName ?? undefined,
      status: data.status ?? undefined,
    },
    include: { bot: true },
  });

  return serializeDeployment(updated);
}

async function updateDeploymentStatus(userId, deploymentId, status) {
  const deployment = await getDeployment(userId, deploymentId);
  if (!deployment) return null;

  const updated = await prisma.deployment.update({
    where: { id: deploymentId },
    data: { status },
    include: { bot: true },
  });

  return serializeDeployment(updated);
}

async function updateDeploymentPairingSession(userId, deploymentId, session) {
  const deployment = await getDeployment(userId, deploymentId);
  if (!deployment) return null;

  const updated = await prisma.deployment.update({
    where: { id: deploymentId },
    data: {
      pairingSessionId: session.sessionId ?? session.id ?? undefined,
      pairingCode: session.pairingCode ?? undefined,
      qr: session.qr ?? undefined,
      expiresAt: session.expiresAt ? new Date(session.expiresAt) : undefined,
      status: session.deploymentStatus ?? session.status,
    },
    include: { bot: true },
  });

  return serializeDeployment(updated);
}

async function clearDeploymentPairingSession(userId, deploymentId) {
  const deployment = await getDeployment(userId, deploymentId);
  if (!deployment) return null;

  const updated = await prisma.deployment.update({
    where: { id: deploymentId },
    data: {
      pairingSessionId: null,
      pairingCode: null,
      qr: null,
      expiresAt: null,
      status: "queued",
    },
    include: { bot: true },
  });

  return serializeDeployment(updated);
}

async function deleteDeployment(userId, deploymentId) {
  const deployment = await getDeployment(userId, deploymentId);
  if (!deployment) return null;

  await prisma.deployment.delete({ where: { id: deploymentId } });
  return deployment;
}

module.exports = {
  getUserDeployments,
  getDeployment,
  createDeployment,
  updateDeployment,
  updateDeploymentStatus,
  updateDeploymentPairingSession,
  clearDeploymentPairingSession,
  deleteDeployment,
};
