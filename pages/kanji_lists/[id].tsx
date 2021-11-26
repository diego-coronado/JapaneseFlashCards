import { useState } from "react";
import { useRouter } from "next/router";
import { getKanjiList, getKanjiLists } from "../../lib/db/kanjiLists";
import GoBackButton from "../../components/goBackButton";
import Button from "../../components/button";
import DeckSlider from "../../components/deckSlider";
import { KanjiCardListWithCards } from "../../lib/types";

type Option = {
  kanjiCard: {
    kanji: string;
    onyomi: string[];
    kunyomi: string[];
  };
};

function KanjiList({ list }: { list: KanjiCardListWithCards }) {
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
          list={list.kanjiCards}
          front={(option: Option) => (
            <div className="p-2 pr-4">{option.kanjiCard.kanji}</div>
          )}
          back={(option: Option) => (
            <div className="p-2">
              <div className="text-xs text-left sm:text-base">{`On: ${option.kanjiCard.onyomi.join(
                ", "
              )}`}</div>
              <div className="text-xs text-left sm:text-base">{`Kun: ${option.kanjiCard.kunyomi.join(
                ", "
              )}`}</div>
            </div>
          )}
        />
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const lists = await getKanjiLists();
  const paths = lists.map((item) => {
    return { params: { id: item.id.toString() } };
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const list = await getKanjiList(parseInt(params.id), {
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
    props: { list },
    revalidate: 1,
  };
}

export default KanjiList;
