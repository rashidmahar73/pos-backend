/*
  Warnings:

  - Added the required column `is_active` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_edit_action` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "is_active" BOOLEAN NOT NULL,
ADD COLUMN     "is_delete_action" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_edit_action" BOOLEAN NOT NULL;
