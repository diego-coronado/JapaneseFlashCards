/*
  Warnings:

  - Added the required column `level` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "level" "LEVEL" NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "type" "TYPE" NOT NULL;
