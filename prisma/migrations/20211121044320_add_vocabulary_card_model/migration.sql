-- CreateTable
CREATE TABLE "VocabularyCard" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "chapterId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VocabularyCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VocabularyCardList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VocabularyCardList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VocabularyCardOnVocabularyCardList" (
    "vocabularyCardId" INTEGER NOT NULL,
    "vocabularyCardListId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VocabularyCardOnVocabularyCardList_pkey" PRIMARY KEY ("vocabularyCardId","vocabularyCardListId")
);

-- AddForeignKey
ALTER TABLE "VocabularyCard" ADD CONSTRAINT "VocabularyCard_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VocabularyCardOnVocabularyCardList" ADD CONSTRAINT "VocabularyCardOnVocabularyCardList_vocabularyCardId_fkey" FOREIGN KEY ("vocabularyCardId") REFERENCES "VocabularyCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VocabularyCardOnVocabularyCardList" ADD CONSTRAINT "VocabularyCardOnVocabularyCardList_vocabularyCardListId_fkey" FOREIGN KEY ("vocabularyCardListId") REFERENCES "VocabularyCardList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
