/*
  Warnings:

  - You are about to drop the column `emailVerificationToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerificationToken",
DROP COLUMN "resetPasswordToken",
ADD COLUMN     "emailVerificationOtp" TEXT,
ADD COLUMN     "resetPasswordOtp" TEXT;
