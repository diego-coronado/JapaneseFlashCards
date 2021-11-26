import { useState } from "react";
import { GrammarCardList, TYPE } from ".prisma/client";
import { getBooks } from "../../lib/db/books";
import GoBackButton from "../../components/goBackButton";
import GrammarListForm from "./grammarListForm";
import { getGrammarLists } from "../../lib/db/grammarLists";
import Link from "next/link";
import format from "date-fns/format";
import { BookWithChapter } from "../../lib/types";

type GrammarCardListWithCards = {
  grammarCards: any[];
} & GrammarCardList;

const GrammarLists = ({
  books,
  grammarLists,
}: {
  books: BookWithChapter[];
  grammarLists: GrammarCardListWithCards[];
}) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="margin-safe py-5 space-y-3">
      <GoBackButton />
      <button
        className="button py-1 px-2 rounded-md focus:outline-none border border-gray-400"
        onClick={() => setShowForm((prev) => !prev)}
      >
        Create a new Grammar List
      </button>

      {showForm && <GrammarListForm books={books} />}
      <div className="text-2xl">Grammar Lists:</div>
      {grammarLists.length > 0 ? (
        <div className="space-y-2">
          {grammarLists.map((deck) => (
            <div
              key={deck.id}
              className="border border-gray-400 rounded-md p-2"
            >
              <div>
                <Link href={`grammar_lists/${deck.id}`}>{deck.name}</Link>
              </div>
              <div>{`Number of cards: ${deck.grammarCards.length}`}</div>
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
        equals: TYPE.grammar,
      },
    },
    include: {
      chapters: {
        select: {
          id: true,
          name: true,
          grammarCard: {
            select: {
              id: true,
              point: true,
              structure: true,
              definition: true,
              examples: true,
            },
          },
        },
      },
    },
  });
  const grammarLists = await getGrammarLists({
    include: {
      grammarCards: {
        select: {
          grammarCard: {
            select: {
              id: true,
              point: true,
              structure: true,
              definition: true,
              examples: true,
            },
          },
        },
      },
    },
  });

  return {
    props: {
      books,
      grammarLists,
    },
  };
}

export default GrammarLists;
