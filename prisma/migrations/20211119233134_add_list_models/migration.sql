-- CreateTable
CREATE TABLE "KanjiCardList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KanjiCardList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KanjiCardOnKanjiCardList" (
    "kanjiCardId" INTEGER NOT NULL,
    "kanjiCardListId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KanjiCardOnKanjiCardList_pkey" PRIMARY KEY ("kanjiCardId","kanjiCardListId")
);

-- CreateTable
CREATE TABLE "WordCardList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WordCardList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordCardOnWordCardList" (
    "wordCardId" INTEGER NOT NULL,
    "wordCardListId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WordCardOnWordCardList_pkey" PRIMARY KEY ("wordCardId","wordCardListId")
);

-- CreateTable
CREATE TABLE "GrammarCardList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrammarCardList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrammarCardOnGrammarCardList" (
    "grammarCardId" INTEGER NOT NULL,
    "grammarCardListId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrammarCardOnGrammarCardList_pkey" PRIMARY KEY ("grammarCardId","grammarCardListId")
);

-- AddForeignKey
ALTER TABLE "KanjiCardOnKanjiCardList" ADD CONSTRAINT "KanjiCardOnKanjiCardList_kanjiCardId_fkey" FOREIGN KEY ("kanjiCardId") REFERENCES "KanjiCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KanjiCardOnKanjiCardList" ADD CONSTRAINT "KanjiCardOnKanjiCardList_kanjiCardListId_fkey" FOREIGN KEY ("kanjiCardListId") REFERENCES "KanjiCardList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordCardOnWordCardList" ADD CONSTRAINT "WordCardOnWordCardList_wordCardId_fkey" FOREIGN KEY ("wordCardId") REFERENCES "WordCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordCardOnWordCardList" ADD CONSTRAINT "WordCardOnWordCardList_wordCardListId_fkey" FOREIGN KEY ("wordCardListId") REFERENCES "WordCardList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrammarCardOnGrammarCardList" ADD CONSTRAINT "GrammarCardOnGrammarCardList_grammarCardId_fkey" FOREIGN KEY ("grammarCardId") REFERENCES "GrammarCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrammarCardOnGrammarCardList" ADD CONSTRAINT "GrammarCardOnGrammarCardList_grammarCardListId_fkey" FOREIGN KEY ("grammarCardListId") REFERENCES "GrammarCardList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
