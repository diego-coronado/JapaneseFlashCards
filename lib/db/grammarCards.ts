import { prisma } from "./prisma";

export async function getGrammarCards(options: any = {}) {
  const grammarCards = await prisma.grammarCard.findMany({ ...options });
  const grammarCardsFormatted = grammarCards.map((grammarCard) => {
    return {
      ...grammarCard,
      createdAt: grammarCard.createdAt.toString(),
      updatedAt: grammarCard.updatedAt.toString(),
    };
  });
  return grammarCardsFormatted;
}

export async function createGrammarCard(
  point: string,
  structure: string,
  definition: string,
  chapterId: number
) {
  return await prisma.grammarCard.create({
    data: {
      point,
      structure,
      definition,
      chapterId,
    },
  });
}
