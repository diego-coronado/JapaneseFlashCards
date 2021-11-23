import { prisma } from "./prisma";

export async function getVocabularyLists(options: any = {}) {
  const lists = await prisma.vocabularyCardList.findMany({ ...options });
  const listsFormatted = lists.map((vocabularyCardList) => {
    return {
      ...vocabularyCardList,
      createdAt: vocabularyCardList.createdAt.toString(),
      updatedAt: vocabularyCardList.updatedAt.toString(),
    };
  });
  return listsFormatted;
}

export async function getVocabularyList(id: number, options: any = {}) {
  const list = await prisma.vocabularyCardList.findUnique({
    where: {
      id,
    },
    ...options,
  });
  const listFormatted = {
    ...list,
    createdAt: list?.createdAt.toString(),
    updatedAt: list?.updatedAt.toString(),
  };

  return listFormatted;
}

export async function createVocabularyList(
  name: string,
  vocabularyIds: number[]
) {
  const list = await prisma.vocabularyCardList.create({
    data: {
      name,
    },
  });
  vocabularyIds.map(async (id) => {
    await prisma.vocabularyCardOnVocabularyCardList.create({
      data: {
        vocabularyCardId: id,
        vocabularyCardListId: list.id,
      },
    });
  });
}
