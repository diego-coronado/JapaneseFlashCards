import { prisma } from "./prisma";

export async function getWordLists(options: any = {}) {
  const lists = await prisma.wordCardList.findMany({ ...options });
  const listsFormatted = lists.map((wordCardList) => {
    return {
      ...wordCardList,
      createdAt: wordCardList.createdAt.toString(),
      updatedAt: wordCardList.updatedAt.toString(),
    };
  });
  return listsFormatted;
}

export async function getWordList(id: number, options: any = {}) {
  const list = await prisma.wordCardList.findUnique({
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

export async function createWordList(name: string, wordIds: number[]) {
  const list = await prisma.wordCardList.create({
    data: {
      name,
    },
  });
  wordIds.map(async (id) => {
    await prisma.wordCardOnWordCardList.create({
      data: {
        wordCardId: id,
        wordCardListId: list.id,
      },
    });
  });
}
