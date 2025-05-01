-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);
