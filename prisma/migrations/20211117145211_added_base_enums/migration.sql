-- CreateEnum
CREATE TYPE "LEVEL" AS ENUM ('N5', 'N4', 'N3', 'N2', 'N1');

-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('word', 'kanji', 'grammar');

-- CreateTable
CREATE TABLE "Chapter" (
    "id" INTEGER NOT NULL,
    "created_at" DATE,
    "updated_at" DATE,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);
