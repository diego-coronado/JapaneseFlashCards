import { prisma } from "./prisma";

export async function getGrammarLists(options: any = {}) {
  const lists = await prisma.grammarCardList.findMany({ ...options });
  const listsFormatted = lists.map((grammarCardList) => {
    return {
      ...grammarCardList,
      createdAt: grammarCardList.createdAt.toString(),
      updatedAt: grammarCardList.updatedAt.toString(),
    };
  });
  return listsFormatted;
}

export async function getGrammarList(id: number, options: any = {}) {
  const list = await prisma.grammarCardList.findUnique({
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

export async function createGrammarList(name: string, grammarIds: number[]) {
  const list = await prisma.grammarCardList.create({
    data: {
      name,
    },
  });
  grammarIds.map(async (id) => {
    await prisma.grammarCardOnGrammarCardList.create({
      data: {
        grammarCardId: id,
        grammarCardListId: list.id,
      },
    });
  });
}
