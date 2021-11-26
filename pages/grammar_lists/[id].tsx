import { useState } from "react";
import { useRouter } from "next/router";
import { getGrammarList, getGrammarLists } from "../../lib/db/grammarLists";
import GoBackButton from "../../components/goBackButton";
import Button from "../../components/button";
import DeckSlider from "../../components/deckSlider";
import { GrammarCardListWithCards } from "../../lib/types";

type Option = {
  grammarCard: {
    point: string;
    structure: string;
    definition: string;
    examples: string[];
  };
};

function GrammarList({ list }: { list: GrammarCardListWithCards }) {
  const [startStudy, setStartStudy] = useState(false);
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="margin-safe py-5 space-y-3">
      <GoBackButton />
      <Button
        onClick={() => setStartStudy((prev) => !prev)}
        title="Start to study"
      />
      {startStudy && (
        <DeckSlider
          list={list.grammarCards}
          front={(option: Option) => (
            <div className="p-2 pr-4">{option.grammarCard.point}</div>
          )}
          back={(option: Option) => (
            <div className="p-2 space-y-2">
              <div className="text-xs text-left sm:text-base">{`Structure: ${option.grammarCard.structure}`}</div>
              <div className="text-xs text-left sm:text-base">{`Definition: ${option.grammarCard.definition}`}</div>
            </div>
          )}
          hints={(option: Option) => (
            <div className="p-2">
              <p className="text-left text-xs sm:text-sm">Hints:</p>
              <ul className="text-xs sm:text-sm text-left">
                {option.grammarCard.examples.map(
                  (example: string, i: number) => (
                    <li key={i}>{example}</li>
                  )
                )}
              </ul>
            </div>
          )}
        />
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const lists = await getGrammarLists();
  const paths = lists.map((item) => {
    return { params: { id: item.id.toString() } };
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const list = await getGrammarList(parseInt(params.id), {
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
    props: { list },
    revalidate: 1,
  };
}

export default GrammarList;
