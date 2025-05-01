/*
  Warnings:

  - You are about to drop the column `is_edit_action` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `is_create_action` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_read_action` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_update_action` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "is_edit_action",
ADD COLUMN     "is_create_action" BOOLEAN NOT NULL,
ADD COLUMN     "is_read_action" BOOLEAN NOT NULL,
ADD COLUMN     "is_update_action" BOOLEAN NOT NULL;
