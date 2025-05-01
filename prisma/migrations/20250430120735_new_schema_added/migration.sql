/*
  Warnings:

  - You are about to drop the column `is_create_action` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `is_delete_action` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `is_read_action` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `is_update_action` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "is_create_action",
DROP COLUMN "is_delete_action",
DROP COLUMN "is_read_action",
DROP COLUMN "is_update_action",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "is_create_action" BOOLEAN NOT NULL DEFAULT false,
    "is_read_action" BOOLEAN NOT NULL DEFAULT false,
    "is_update_action" BOOLEAN NOT NULL DEFAULT false,
    "is_delete_action" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_profile_id_key" ON "Staff"("profile_id");
