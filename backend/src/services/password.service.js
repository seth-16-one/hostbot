const prisma = require("../config/prisma");

async function findUserByResetOtp(otp) {
  return prisma.user.findFirst({
    where: {
      resetPasswordOtp: otp,
      resetPasswordExpiresAt: {
        gt: new Date(),
      },
    },
  });
}

async function clearResetOtp(userId) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      resetPasswordOtp: null,
      resetPasswordExpiresAt: null,
    },
  });
}

module.exports = {
  findUserByResetOtp,
  clearResetOtp,
};
