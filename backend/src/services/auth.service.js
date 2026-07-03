const prisma = require("../config/prisma");

async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function findUserById(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

async function createUser(data) {
  return prisma.user.create({
    data,
  });
}

async function updateForgotPasswordOtp(userId, otp, expiresAt) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      resetPasswordOtp: otp,
      resetPasswordExpiresAt: expiresAt,
    },
  });
}

async function updateEmailVerificationOtp(userId, otp, expiresAt) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      emailVerificationOtp: otp,
      emailVerificationExpiresAt: expiresAt,
    },
  });
}

async function findUserByEmailVerificationOtp(email, otp) {
  return prisma.user.findFirst({
    where: {
      email,
      emailVerificationOtp: otp,
    },
  });
}

async function findUserByPasswordOtp(email, otp) {
  return prisma.user.findFirst({
    where: {
      email,
      resetPasswordOtp: otp,
    },
  });
}

async function updatePassword(userId, passwordHash) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      passwordHash,
      resetPasswordOtp: null,
      resetPasswordExpiresAt: null,
    },
  });
}

async function verifyUserEmail(userId) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerified: true,
      emailVerificationOtp: null,
      emailVerificationExpiresAt: null,
    },
  });
}

async function findUserByPasswordOtp(email, otp) {
  return prisma.user.findFirst({
    where: {
      email,
      resetPasswordOtp: otp,
    },
  });
}

async function clearPasswordOtp(userId) {
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

async function updatePassword(userId, passwordHash) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      passwordHash,
    },
  });
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateForgotPasswordOtp,
  updateEmailVerificationOtp,
  findUserByEmailVerificationOtp,
  findUserByPasswordOtp,
  updatePassword,
  verifyUserEmail,
};
