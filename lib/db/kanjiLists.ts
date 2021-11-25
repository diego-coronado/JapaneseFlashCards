import { prisma } from "./prisma";

export async function getKanjiLists(options: any = {}) {
  const lists = await prisma.kanjiCardList.findMany({ ...options });
  const listsFormatted = lists.map((kanjiCardList) => {
    return {
      ...kanjiCardList,
      createdAt: kanjiCardList.createdAt.toString(),
      updatedAt: kanjiCardList.updatedAt.toString(),
    };
  });
  return listsFormatted;
}

export async function getKanjiList(id: number, options: any = {}) {
  const list = await prisma.kanjiCardList.findUnique({
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

export async function createKanjiList(name: string, kanjiIds: number[]) {
  const list = await prisma.kanjiCardList.create({
    data: {
      name,
    },
  });
  kanjiIds.map(async (id) => {
    await prisma.kanjiCardOnKanjiCardList.create({
      data: {
        kanjiCardId: id,
        kanjiCardListId: list.id,
      },
    });
  });
}
