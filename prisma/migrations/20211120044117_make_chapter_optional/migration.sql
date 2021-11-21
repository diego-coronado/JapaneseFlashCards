-- DropForeignKey
ALTER TABLE "GrammarCard" DROP CONSTRAINT "GrammarCard_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "KanjiCard" DROP CONSTRAINT "KanjiCard_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "WordCard" DROP CONSTRAINT "WordCard_chapterId_fkey";

-- AlterTable
ALTER TABLE "GrammarCard" ALTER COLUMN "chapterId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "KanjiCard" ALTER COLUMN "chapterId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WordCard" ALTER COLUMN "chapterId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "WordCard" ADD CONSTRAINT "WordCard_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrammarCard" ADD CONSTRAINT "GrammarCard_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KanjiCard" ADD CONSTRAINT "KanjiCard_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
