-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TECNICO', 'ADMIN', 'PACIENTE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "born_at" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adress" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image_path" TEXT,
    "role" "Role" NOT NULL DEFAULT 'PACIENTE',
    "unit_name" TEXT NOT NULL,
    "unit_adress" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notif" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "notif_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "massages" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "send_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sender_Id" TEXT NOT NULL,

    CONSTRAINT "massages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_status" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blood_pressure" DOUBLE PRECISION NOT NULL,
    "blood_glucose" DOUBLE PRECISION NOT NULL,
    "cholesterol" DOUBLE PRECISION NOT NULL,
    "weigth" DOUBLE PRECISION NOT NULL,
    "triglycerides" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "health_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "notif" ADD CONSTRAINT "notif_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "massages" ADD CONSTRAINT "massages_sender_Id_fkey" FOREIGN KEY ("sender_Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_status" ADD CONSTRAINT "health_status_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
