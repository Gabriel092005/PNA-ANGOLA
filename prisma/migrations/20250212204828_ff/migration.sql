/*
  Warnings:

  - You are about to drop the column `blood_pressure` on the `health_status` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "health_status" DROP COLUMN "blood_pressure",
ADD COLUMN     "diastolic" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sistolic" DOUBLE PRECISION NOT NULL DEFAULT 0;
