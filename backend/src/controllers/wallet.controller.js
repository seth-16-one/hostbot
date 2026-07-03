const walletService = require("../services/wallet.service");

async function getWallet(req, res, next) {
  try {
    const wallet = await walletService.getWallet(req.user.id);

    return res.json({
      success: true,
      wallet,
    });
  } catch (error) {
    next(error);
  }
}

async function getPackages(req, res, next) {
  try {
    return res.json(walletService.getRechargePackages());
  } catch (error) {
    next(error);
  }
}

async function getTransactions(req, res, next) {
  try {
    const transactions = await walletService.getTransactions(req.user.id);
    return res.json(transactions);
  } catch (error) {
    next(error);
  }
}

async function createRecharge(req, res, next) {
  try {
    const recharge = await walletService.createRecharge(req.user.id, req.body || {});
    return res.status(201).json(recharge);
  } catch (error) {
    next(error);
  }
}

async function verifyRecharge(req, res, next) {
  try {
    const recharge = await walletService.verifyRecharge(req.user.id, req.params.id);
    if (!recharge) {
      return res.status(404).json({ message: "Recharge not found" });
    }

    return res.json(recharge);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getWallet,
  getPackages,
  getTransactions,
  createRecharge,
  verifyRecharge,
};
