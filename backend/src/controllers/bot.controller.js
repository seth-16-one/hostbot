const { getAllBots, getBotById } = require("../services/bot.service");

async function getBots(req, res) {
  try {
    const bots = await getAllBots();

    return res.json(bots);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to load bots",
    });
  }
}

async function getBot(req, res) {
  try {
    const bot = await getBotById(req.params.id);

    if (!bot) {
      return res.status(404).json({
        message: "Bot not found",
      });
    }

    return res.json(bot);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to load bot",
    });
  }
}

module.exports = {
  getBots,
  getBot,
};