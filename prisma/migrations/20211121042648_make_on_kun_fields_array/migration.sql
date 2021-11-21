/*
  Warnings:

  - The `onyomi` column on the `KanjiCard` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `kunyomi` column on the `KanjiCard` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "KanjiCard" DROP COLUMN "onyomi",
ADD COLUMN     "onyomi" TEXT[],
DROP COLUMN "kunyomi",
ADD COLUMN     "kunyomi" TEXT[];
