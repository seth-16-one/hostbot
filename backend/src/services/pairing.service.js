function normalizeDeploymentStatus(status) {
  if (status === "waiting") return "pairing";
  if (status === "connected") return "online";
  if (status === "expired") return "expired";
  if (status === "closed") return "offline";
  if (status === "disconnected") return "offline";
  return status || "pairing";
}

function pairingErrorMessage(payload) {
  const code = payload?.error?.code;
  if (code === "INVALID_PHONE") return "Enter a valid phone number with country code.";
  if (code === "SESSION_NOT_FOUND") return "Pairing session was not found. Please try again.";
  return "Unable to start pairing. Please try again.";
}

function normalizePayload(payload, fallbackDeploymentId) {
  const session = payload?.session || payload;
  const rawStatus = session.status || payload?.status || "waiting";

  return {
    sessionId: session.sessionId || session.id,
    deploymentId: session.deploymentId || fallbackDeploymentId,
    phone: session.phone,
    pairingCode: session.pairingCode || session.pairCode,
    qr: session.qr || session.qrValue || session.pairingLink,
    expiresAt: session.expiresAt,
    status: rawStatus,
    deploymentStatus: normalizeDeploymentStatus(rawStatus),
    connectedAt: session.connectedAt,
  };
}

async function requestPairingSession(deployment) {
  const baseUrl = process.env.PAIRING_SERVER_URL;
  if (!baseUrl) throw new Error("Pairing service is not configured.");

  const phone = String(deployment.ownerNumber || "").replace(/\D/g, "");
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}${process.env.PAIRING_SERVER_SESSION_PATH || "/pair"}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(process.env.PAIRING_SERVER_TOKEN ? { Authorization: `Bearer ${process.env.PAIRING_SERVER_TOKEN}` } : {}),
    },
    body: JSON.stringify({
      deploymentId: deployment.id,
      botId: deployment.botId,
      botName: deployment.botName,
      ownerNumber: deployment.ownerNumber,
      phone,
      sessionName: deployment.sessionName,
      prefix: deployment.prefix,
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload?.success === false) {
    const error = new Error(pairingErrorMessage(payload));
    error.status = response.status || 502;
    throw error;
  }

  return normalizePayload(payload, deployment.id);
}

async function getPairingSessionStatus(sessionId) {
  const baseUrl = process.env.PAIRING_SERVER_URL;
  if (!baseUrl) throw new Error("Pairing service is not configured.");

  const path = (process.env.PAIRING_SERVER_STATUS_PATH || "/pair/:sessionId").replace(
    ":sessionId",
    encodeURIComponent(sessionId),
  );

  const response = await fetch(`${baseUrl.replace(/\/$/, "")}${path}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(process.env.PAIRING_SERVER_TOKEN ? { Authorization: `Bearer ${process.env.PAIRING_SERVER_TOKEN}` } : {}),
    },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload?.success === false) {
    const error = new Error(pairingErrorMessage(payload));
    error.status = response.status || 502;
    throw error;
  }

  return normalizePayload(payload);
}

async function deletePairingSession(sessionId) {
  const baseUrl = process.env.PAIRING_SERVER_URL;
  if (!baseUrl || !sessionId) return;

  const path = (process.env.PAIRING_SERVER_DELETE_PATH || "/pair/:sessionId").replace(
    ":sessionId",
    encodeURIComponent(sessionId),
  );

  await fetch(`${baseUrl.replace(/\/$/, "")}${path}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      ...(process.env.PAIRING_SERVER_TOKEN ? { Authorization: `Bearer ${process.env.PAIRING_SERVER_TOKEN}` } : {}),
    },
  }).catch(() => undefined);
}

module.exports = {
  requestPairingSession,
  getPairingSessionStatus,
  deletePairingSession,
};
