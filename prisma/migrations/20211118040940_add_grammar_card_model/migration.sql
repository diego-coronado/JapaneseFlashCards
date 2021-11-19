-- CreateTable
CREATE TABLE "GrammarCard" (
    "id" SERIAL NOT NULL,
    "point" TEXT NOT NULL,
    "structure" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "chapterId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrammarCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GrammarCard" ADD CONSTRAINT "GrammarCard_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
