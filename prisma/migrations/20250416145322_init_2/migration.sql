/*
  Warnings:

  - You are about to drop the column `email` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `price` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "email",
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "service" TEXT NOT NULL;
