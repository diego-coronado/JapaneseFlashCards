import { prisma } from "./prisma";

export async function getWordCards(options: any = {}) {
  const wordCards = await prisma.wordCard.findMany({ ...options });
  const wordCardsFormatted = wordCards.map((wordCard) => {
    return {
      ...wordCard,
      createdAt: wordCard.createdAt.toString(),
      updatedAt: wordCard.updatedAt.toString(),
    };
  });
  return wordCardsFormatted;
}

export async function createWordCard(
  word: string,
  reading: string,
  chapterId: number
) {
  return await prisma.wordCard.create({
    data: {
      word,
      reading,
      chapterId,
    },
  });
}
