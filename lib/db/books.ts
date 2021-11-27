import { TYPE } from ".prisma/client";
import { prisma } from "./prisma";

export async function getBooks(options: any = {}) {
  const books = await prisma.book.findMany({ ...options });
  const booksFormatted = book?.map((book) => {
    return {
      ...book,
      createdAt: book.createdAt.toString(),
      updatedAt: book.updatedAt.toString(),
    };
  });
  return booksFormatted;
}

export async function createBook(name: string, type: TYPE) {
  return await prisma.book.create({
    data: {
      name,
      type,
    },
  });
}
