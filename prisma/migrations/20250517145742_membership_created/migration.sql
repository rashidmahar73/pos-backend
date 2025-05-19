-- CreateTable
CREATE TABLE "Membership" (
    "id" SERIAL NOT NULL,
    "plan_id" INTEGER NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "prev_duration" TEXT NOT NULL,
    "current_duration" TEXT NOT NULL,
    "expire_at" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);
