require("dotenv").config();

const app = require("./app");
const prisma = require("./config/prisma");

const port = Number(process.env.BACKEND_PORT || process.env.PORT || 3001);
const host = process.env.BACKEND_HOST || "0.0.0.0";

const server = app.listen(port, host, () => {
  console.log(`HostBot backend listening on ${host}:${port}`);
});

async function shutdown(signal) {
  console.log(`${signal} received. Shutting down backend...`);
  server.close(async () => {
    await prisma.$disconnect().catch((error) => console.error(error));
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
