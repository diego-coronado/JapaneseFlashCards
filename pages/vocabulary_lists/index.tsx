import { useState } from "react";
import { TYPE } from ".prisma/client";
import { getBooks } from "../../lib/db/books";
import GoBackButton from "../../components/goBackButton";
import VocabularyListForm from "../../components/forms/vocabularyListForm";
import { getVocabularyLists } from "../../lib/db/vocabularyLists";
import Link from "next/link";
import format from "date-fns/format";
import { BookWithChapter, VocabularyCardListWithCards } from "../../lib/types";

const VocabularyLists = ({
  books,
  vocabularyLists,
}: {
  books: BookWithChapter[];
  vocabularyLists: VocabularyCardListWithCards[];
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
      {vocabularyLists.length > 0 ? (
        <div className="space-y-2">
          {vocabularyLists.map((deck) => (
            <div
              key={deck.id}
              className="border border-gray-400 rounded-md p-2"
            >
              <div>
                <Link href={`vocabulary_lists/${deck.id}`}>{deck.name}</Link>
              </div>
              <div>{`Number of cards: ${deck.vocabularyCards.length}`}</div>
              <div>{`Created: ${format(
                new Date(deck.createdAt),
                "dd/MM/yyyy"
              )}`}</div>
            </div>
          ))}
        </div>
      ) : (
        <p>There are no lists yet.</p>
      )}
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
  const vocabularyLists = await getVocabularyLists({
    include: {
      vocabularyCards: {
        select: {
          vocabularyCard: {
            select: { id: true },
          },
        },
      },
    },
  });

  return {
    props: {
      books,
      vocabularyLists,
    },
  };
}

export default VocabularyLists;
