//throw new Error("SEED FILE EXECUTED");

const prisma = require("./config/prisma");
const crypto = require("crypto");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");

  const hash = crypto
    .pbkdf2Sync(password, salt, 120000, 64, "sha512")
    .toString("hex");

  return `${salt}:${hash}`;
}

async function main() {
  console.log("Starting seed...");

  const users = await prisma.user.findMany();

  console.log("Current users:", users);

  const existing = await prisma.user.findUnique({
    where: {
      email: "demo@hostbot.local",
    },
  });

  console.log("Existing:", existing);

  if (!existing) {
    const user = await prisma.user.create({
      data: {
        firstName: "Demo",
        lastName: "User",
        email: "demo@hostbot.local",
        phone: "+254700000000",
        emailVerified: true,
        passwordHash: hashPassword("password123"),
      },
    });

    console.log("Created:", user);
  }

  const finalUsers = await prisma.user.findMany();

  console.log("Final users:", finalUsers);
}

main()
  .catch((err) => {
    console.error("SEED ERROR:");
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
