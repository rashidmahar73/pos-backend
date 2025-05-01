/*
  Warnings:

  - Added the required column `confirmation_access_token` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confirmation_access_token` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "confirmation_access_token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "confirmation_access_token" TEXT NOT NULL;
