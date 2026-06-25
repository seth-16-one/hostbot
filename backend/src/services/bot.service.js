const prisma = require("../config/prisma");

async function getAllBots() {
  return prisma.bot.findMany({
    orderBy: {
      id: "asc",
    },
  });
}

async function getBotById(id) {
  return prisma.bot.findUnique({
    where: {
      id: Number(id),
    },
  });
}

module.exports = {
  getAllBots,
  getBotById,
};