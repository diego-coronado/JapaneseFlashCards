import { Book, TYPE } from ".prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { getBooks } from "../../lib/db/books";
import GrammarCardForm from "./grammarCardForm";
import Link from "next/link";
import GoBackButton from "../../components/goBackButton";

const GrammarCards = ({ books }: { books: Book[] }) => {
  const [showGrammarCardForm, setShowGrammarCardForm] = useState(false);
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
      <GoBackButton />
      <button
        className="button py-1 px-2 rounded-md focus:outline-none border border-gray-400"
        onClick={() => setShowGrammarCardForm((prev) => !prev)}
      >
        Create a new Grammar Card
      </button>
      {showGrammarCardForm && <GrammarCardForm books={books} />}
    </div>
  );
};

export async function getServerSideProps() {
  const books = await getBooks({
    where: {
      type: {
        equals: TYPE.grammar,
      },
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

export default GrammarCards;
