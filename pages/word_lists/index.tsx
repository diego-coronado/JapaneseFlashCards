import { useState } from "react";
import { TYPE } from ".prisma/client";
import { getBooks } from "../../lib/db/books";
import GoBackButton from "../../components/goBackButton";
import Link from "next/link";
import format from "date-fns/format";
import { BookWithChapter, WordCardListWithCards } from "../../lib/types";
import { getWordLists } from "../../lib/db/wordLists";
import WordListForm from "./wordListform";

const WordLists = ({
  books,
  wordLists,
}: {
  books: BookWithChapter[];
  wordLists: WordCardListWithCards[];
}) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="margin-safe py-5 space-y-3">
      <GoBackButton />
      <button
        className="button py-1 px-2 rounded-md focus:outline-none border border-gray-400"
        onClick={() => setShowForm((prev) => !prev)}
      >
        Create a new Word List
      </button>

      {showForm && <WordListForm books={books} />}
      <div className="text-2xl">Word Lists:</div>
      {wordLists.length > 0 ? (
        <div className="space-y-2">
          {wordLists.map((deck) => (
            <div
              key={deck.id}
              className="border border-gray-400 rounded-md p-2"
            >
              <div>
                <Link href={`word_lists/${deck.id}`}>{deck.name}</Link>
              </div>
              <div>{`Number of cards: ${deck.wordCards.length}`}</div>
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
      OR: [
        {
          type: {
            equals: TYPE.kanji,
          },
        },
        {
          type: {
            equals: TYPE.vocabulary,
          },
        },
      ],
    },
    include: {
      chapters: {
        select: {
          id: true,
          name: true,
          wordCards: {
            select: { id: true, word: true },
          },
        },
      },
    },
  });
  const wordLists = await getWordLists({
    include: {
      wordCards: {
        select: {
          wordCard: {
            select: { id: true },
          },
        },
      },
    },
  });

  return {
    props: {
      books,
      wordLists,
    },
  };
}

export default WordLists;
