-- AlterTable
ALTER TABLE "Warehouses" ADD COLUMN     "city_id" INTEGER,
ADD COLUMN     "zip_code" TEXT NOT NULL DEFAULT '';
