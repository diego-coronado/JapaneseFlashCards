import { Book, TYPE, WordCard } from ".prisma/client";
import { useRouter } from "next/router";
import { getBooks } from "../../lib/db/books";
import { getWordCards } from "../../lib/db/wordCards";
import WordCardForm from "./wordCardForm";
import Link from "next/link";

const WordCards = ({ books }: { books: Book[] }) => {
  const router = useRouter();

  if (books.length === 0) {
    return (
      <div className="margin-safe py-5 space-y-3">
        <div>
          You do not have a book of type grammar added, please add one by
          clicking the link below
        </div>
        <Link href="/books">Create a new Book</Link>
      </div>
    );
  }

  return (
    <div className="margin-safe py-5 space-y-3">
      <div onClick={() => router.back()} className="text-xs">
        Go back
      </div>
      <WordCardForm books={books} />
    </div>
  );
};

export async function getServerSideProps() {
  const books = await getBooks({
    where: {
      type: {
        equals: TYPE.word,
      },
    },
    include: {
      chapters: {
        select: { id: true, name: true },
      },
    },
  });
  // const wordCards = await getWordCards();

  return {
    props: {
      books,
    },
  };
}

export default WordCards;
