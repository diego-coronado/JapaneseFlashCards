import { prisma } from "./prisma";

export async function getKanjiCards(options: any = {}) {
  const kanjiCards = await prisma.kanjiCard.findMany({ ...options });
  const kanjiCardsFormatted = kanjiCards.map((kanjiCard) => {
    return {
      ...kanjiCard,
      createdAt: kanjiCard.createdAt.toString(),
      updatedAt: kanjiCard.updatedAt.toString(),
    };
  });
  return kanjiCardsFormatted;
}

export async function createKanjiCards(
  kanji: string,
  onyomi: string,
  kunyomi: string,
  chapterId: number
) {
  return await prisma.kanjiCard.create({
    data: {
      kanji,
      onyomi,
      kunyomi,
      chapterId,
    },
  });
}
