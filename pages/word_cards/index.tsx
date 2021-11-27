import { Book, TYPE, WordCard } from ".prisma/client";
import { useRouter } from "next/router";
import { getBooks } from "../../lib/db/books";
import { getWordCards } from "../../lib/db/wordCards";
import WordCardForm from "../../components/forms/wordCardForm";
import Link from "next/link";
import GoBackButton from "../../components/goBackButton";

const WordCards = ({ books }: { books: Book[] }) => {
  const router = useRouter();

  if (books.length === 0) {
    return (
      <div className="margin-safe py-5 space-y-3">
        <div>
          You do not have a book of type grammar nor kanji added, please add one
          by clicking the link below
        </div>
        <Link href="/books">Create a new Book</Link>
      </div>
    );
  }

  return (
    <div className="margin-safe py-5 space-y-3">
      <GoBackButton />
      <WordCardForm books={books} />
    </div>
  );
};

export async function getServerSideProps() {
  const books = await getBooks({
    where: {
      OR: [
        {
          type: {
            equals: TYPE.grammar,
          },
        },
        {
          type: {
            equals: TYPE.kanji,
          },
        },
      ],
    },
    include: {
      chapters: {
        select: { id: true, name: true },
      },
    },
  });

  return {
    props: {
      books,
    },
  };
}

export default WordCards;
