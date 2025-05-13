/*
  Warnings:

  - A unique constraint covering the columns `[user_name]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_name]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_name` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "user_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "user_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_name_key" ON "Profile"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_user_name_key" ON "Staff"("user_name");
