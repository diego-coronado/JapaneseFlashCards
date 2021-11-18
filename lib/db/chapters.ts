import { LEVEL, TYPE } from ".prisma/client";
import { prisma } from "./prisma";

export async function getChapters(options: any = {}) {
  const chapters = await prisma.chapter.findMany({ ...options });
  const chaptersFormatted = chapters.map((chapter) => {
    return {
      ...chapter,
      createdAt: chapter.createdAt.toString(),
      updatedAt: chapter.updatedAt.toString(),
    };
  });
  return chaptersFormatted;
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
