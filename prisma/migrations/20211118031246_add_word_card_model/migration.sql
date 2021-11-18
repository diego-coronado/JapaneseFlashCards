-- CreateTable
CREATE TABLE "WordCard" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "reading" TEXT NOT NULL,
    "chapterId" INTEGER NOT NULL,

    CONSTRAINT "WordCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WordCard" ADD CONSTRAINT "WordCard_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
