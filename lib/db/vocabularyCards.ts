import { prisma } from "./prisma";

export async function getVocabularyCards(options: any = {}) {
  const vocabularyCards = await prisma.vocabularyCard.findMany({ ...options });
  const vocabularyCardsFormatted = vocabularyCards.map((vocabularyCard) => {
    return {
      ...vocabularyCard,
      createdAt: vocabularyCard.createdAt.toString(),
      updatedAt: vocabularyCard.updatedAt.toString(),
    };
  });
  return vocabularyCardsFormatted;
}

export async function createVocabularyCard(
  word: string,
  meaning: string,
  chapterId: number
) {
  return await prisma.vocabularyCard.create({
    data: {
      word,
      meaning,
      chapterId,
    },
  });
}
