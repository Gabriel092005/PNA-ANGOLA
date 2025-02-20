-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TECNICO', 'ADMIN', 'PACIENTE');

-- CreateEnum
CREATE TYPE "STATUS_NOW" AS ENUM ('NORMAL', 'GOOD', 'BAD');

-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('MASCULINO', 'FEMENINO');

-- CreateEnum
CREATE TYPE "CLASS" AS ENUM ('HIPERTENSO', 'DIABETICO');

-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('NORMAL', 'GOOD', 'BAD');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "bi" TEXT,
    "status" "STATUS" DEFAULT 'NORMAL',
    "class" "CLASS" NOT NULL,
    "nip" TEXT,
    "born_at" TEXT,
    "province" TEXT NOT NULL,
    "isAlive" BOOLEAN NOT NULL DEFAULT false,
    "gender" "GENDER" NOT NULL DEFAULT 'MASCULINO',
    "unidade" TEXT,
    "municipality" TEXT,
    "patente" TEXT,
    "phone" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image_path" TEXT,
    "role" "Role" NOT NULL DEFAULT 'PACIENTE',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notif" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "notif_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "send_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "receiverId" TEXT NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
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
    "status_now" "STATUS_NOW" NOT NULL DEFAULT 'NORMAL',
    "userId" TEXT NOT NULL,

    CONSTRAINT "health_status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notif" ADD CONSTRAINT "notif_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_status" ADD CONSTRAINT "health_status_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
