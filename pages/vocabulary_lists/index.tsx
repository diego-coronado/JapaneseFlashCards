import { useState } from "react";
import { Book, TYPE, VocabularyCardList } from ".prisma/client";
import { getBooks } from "../../lib/db/books";
import GoBackButton from "../../components/goBackButton";
import VocabularyListForm from "./vocabularyListForm";
import { getVocabularyLists } from "../../lib/db/vocabularyLists";

const VocabularyLists = ({
  books,
  vocabularyLists,
}: {
  books: Book[];
  vocabularyLists: VocabularyCardList[];
}) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="margin-safe py-5 space-y-3">
      <GoBackButton />
      <button
        className="button py-1 px-2 rounded-md focus:outline-none border border-gray-400"
        onClick={() => setShowForm((prev) => !prev)}
      >
        Create a new Vocabulary List
      </button>

      {showForm && <VocabularyListForm books={books} />}
      <div className="text-2xl">Vocabulary Lists:</div>
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
        select: {
          id: true,
          name: true,
          vocabularyCard: {
            select: { id: true, word: true },
          },
        },
      },
    },
  });
  const vocabularyLists = await getVocabularyLists();

  return {
    props: {
      books,
      vocabularyLists,
    },
  };
}

export default VocabularyLists;
