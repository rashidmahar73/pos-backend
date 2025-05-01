/*
  Warnings:

  - A unique constraint covering the columns `[confirmation_access_token]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[confirmation_access_token]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Profile_confirmation_access_token_key" ON "Profile"("confirmation_access_token");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_confirmation_access_token_key" ON "Staff"("confirmation_access_token");
