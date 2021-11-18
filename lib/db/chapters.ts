import { LEVEL, TYPE } from ".prisma/client";
import { prisma } from "./prisma";

export async function getChapters() {
  let chapters = await prisma.chapter.findMany();
  chapters = chapters.map((chapter) => {
    return {
      ...chapter,
      createdAt: chapter.createdAt.toString(),
      updatedAt: chapter.updatedAt.toString(),
    };
  });
  return chapters;
}

export async function createChapter(name: string, level: LEVEL, type: TYPE) {
  return await prisma.chapter.create({
    data: {
      name,
      level,
      type,
    },
  });
}
