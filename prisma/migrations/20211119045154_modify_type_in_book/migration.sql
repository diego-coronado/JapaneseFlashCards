/*
  Warnings:

  - You are about to drop the column `type` on the `Chapter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "type" "TYPE" NOT NULL DEFAULT E'kanji';

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "type";
