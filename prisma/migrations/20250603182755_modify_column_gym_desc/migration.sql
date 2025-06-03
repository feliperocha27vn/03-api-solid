/*
  Warnings:

  - You are about to drop the column `descripton` on the `gyms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gyms" DROP COLUMN "descripton",
ADD COLUMN     "description" TEXT;
