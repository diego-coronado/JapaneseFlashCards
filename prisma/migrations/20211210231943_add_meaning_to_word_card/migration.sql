/*
  Warnings:

  - Added the required column `meaning` to the `WordCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WordCard" ADD COLUMN     "meaning" TEXT NOT NULL;
