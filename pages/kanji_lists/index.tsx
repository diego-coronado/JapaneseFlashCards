import { useState } from "react";
import { KanjiCardList, TYPE } from ".prisma/client";
import { getBooks } from "../../lib/db/books";
import { getKanjiLists } from "../../lib/db/kanjiLists";
import { BookWithChapter } from "../../lib/types";
import GoBackButton from "../../components/goBackButton";
import KanjiListForm from "../../components/forms/kanjiListForm";
import Link from "next/link";
import format from "date-fns/format";

type KanjiCardListWithCards = {
  kanjiCards: any[];
} & KanjiCardList;

const KanjiLists = ({
  books,
  kanjiLists,
}: {
  books: BookWithChapter[];
  kanjiLists: KanjiCardListWithCards[];
}) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="margin-safe py-5 space-y-3">
      <GoBackButton />
      <button
        className="button py-1 px-2 rounded-md focus:outline-none border border-gray-400"
        onClick={() => setShowForm((prev) => !prev)}
      >
        Create a new Kanji List
      </button>

      {showForm && <KanjiListForm books={books} />}
      <div className="text-2xl">Kanji Lists:</div>
      {kanjiLists.length > 0 ? (
        <div className="space-y-2">
          {kanjiLists.map((deck) => (
            <div
              key={deck.id}
              className="border border-gray-400 rounded-md p-2"
            >
              <div>
                <Link href={`kanji_lists/${deck.id}`}>{deck.name}</Link>
              </div>
              <div>{`Number of cards: ${deck.kanjiCards.length}`}</div>
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
        equals: TYPE.kanji,
      },
    },
    include: {
      chapters: {
        select: {
          id: true,
          name: true,
          kanjiCard: {
            select: {
              id: true,
              kanji: true,
              onyomi: true,
              kunyomi: true,
            },
          },
        },
      },
    },
  });
  const kanjiLists = await getKanjiLists({
    include: {
      kanjiCards: {
        select: {
          kanjiCard: {
            select: {
              id: true,
              kanji: true,
              onyomi: true,
              kunyomi: true,
            },
          },
        },
      },
    },
  });

  return {
    props: {
      books,
      kanjiLists,
    },
  };
}

export default KanjiLists;
