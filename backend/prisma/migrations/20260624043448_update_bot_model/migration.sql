-- AlterTable
ALTER TABLE "Bot" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "lastUpdated" TEXT,
ADD COLUMN     "longDescription" TEXT,
ADD COLUMN     "minimumCreditsRequired" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "requirements" TEXT[],
ADD COLUMN     "runCreditsPerHour" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active',
ADD COLUMN     "totalDeployments" INTEGER NOT NULL DEFAULT 0;
