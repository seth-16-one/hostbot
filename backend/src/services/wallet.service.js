const prisma = require("../config/prisma");

const rechargePackages = [
  {
    id: "starter",
    title: "Starter",
    credits: 100,
    price: 150,
    currency: "KES",
    bonusCredits: 10,
    badge: "Starter",
  },
  {
    id: "growth",
    title: "Growth",
    credits: 500,
    price: 650,
    currency: "KES",
    bonusCredits: 75,
    featured: true,
    badge: "Most Popular",
  },
  {
    id: "scale",
    title: "Scale",
    credits: 1200,
    price: 1400,
    currency: "KES",
    bonusCredits: 200,
    badge: "Best Value",
  },
];

async function getWallet(userId) {
  let wallet = await prisma.wallet.findUnique({
    where: {
      userId,
    },
  });

  if (!wallet) {
    wallet = await prisma.wallet.create({
      data: {
        userId,
        credits: 0,
      },
    });
  }

  return wallet;
}

function getRechargePackages() {
  return rechargePackages;
}

async function getTransactions(userId) {
  return prisma.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function createRecharge(userId, data) {
  const selectedPackage = data.packageId
    ? rechargePackages.find((item) => item.id === data.packageId)
    : null;

  const amount = selectedPackage?.price ?? Number(data.amount || 0);
  const credits =
    selectedPackage
      ? selectedPackage.credits + (selectedPackage.bonusCredits || 0)
      : amount;

  if (!amount || amount < 1 || !credits) {
    const error = new Error("A valid recharge package or amount is required");
    error.status = 400;
    throw error;
  }

  return prisma.recharge.create({
    data: {
      userId,
      amount,
      credits,
      paymentMethod: data.method || "mpesa",
      status: "pending",
    },
  });
}

async function verifyRecharge(userId, rechargeId) {
  const recharge = await prisma.recharge.findFirst({
    where: {
      id: rechargeId,
      userId,
    },
  });

  if (!recharge) return null;

  if (recharge.status === "completed") {
    return recharge;
  }

  return prisma.$transaction(async (tx) => {
    const completed = await tx.recharge.update({
      where: {
        id: recharge.id,
      },
      data: {
        status: "completed",
      },
    });

    await tx.wallet.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        credits: completed.credits,
      },
      update: {
        credits: {
          increment: completed.credits,
        },
      },
    });

    await tx.transaction.create({
      data: {
        userId,
        type: "credit",
        status: "completed",
        amount: completed.credits,
        description: "Wallet recharge",
        reference: completed.id,
      },
    });

    return completed;
  });
}

module.exports = {
  getWallet,
  getRechargePackages,
  getTransactions,
  createRecharge,
  verifyRecharge,
};
