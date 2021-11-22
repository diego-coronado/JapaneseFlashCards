import { useState } from "react";
import { Book, TYPE } from ".prisma/client";
import { useRouter } from "next/router";
import { getBooks } from "../../lib/db/books";
import Link from "next/link";
import VocabularyCardForm from "./vocabularyCardForm";
import GoBackButton from "../../components/goBackButton";

const VocabularyCards = ({ books }: { books: Book[] }) => {
  const [showVocabularyCardForm, setShowVocabularyCardForm] = useState(false);
  const router = useRouter();

  if (books.length === 0) {
    return (
      <div className="margin-safe py-5 space-y-3">
        <div>
          You do not have a book of type vocabulary added, please add one by
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
        onClick={() => setShowVocabularyCardForm((prev) => !prev)}
      >
        Create a new Vocabulary Card
      </button>
      {showVocabularyCardForm && <VocabularyCardForm books={books} />}
    </div>
  );
};

export async function getServerSideProps() {
  const books = await getBooks({
    where: {
      type: {
        equals: TYPE.vocabulary,
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

export default VocabularyCards;
