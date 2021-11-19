-- CreateTable
CREATE TABLE "KanjiCard" (
    "id" SERIAL NOT NULL,
    "kanji" TEXT NOT NULL,
    "onyomi" TEXT NOT NULL,
    "kunyomi" TEXT NOT NULL,
    "chapterId" INTEGER NOT NULL,

    CONSTRAINT "KanjiCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KanjiCard" ADD CONSTRAINT "KanjiCard_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
