/*
  Warnings:

  - You are about to drop the `REPORT` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `unitId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "unitId" TEXT NOT NULL;

-- DropTable
DROP TABLE "REPORT";

-- CreateTable
CREATE TABLE "unit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "distrit" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "unit_id_key" ON "unit"("id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
