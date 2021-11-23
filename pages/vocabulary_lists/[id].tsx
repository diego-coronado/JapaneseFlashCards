import { VocabularyCardList } from ".prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../components/button";
import DeckSlider from "../../components/deckSlider";
import GoBackButton from "../../components/goBackButton";
import {
  getVocabularyList,
  getVocabularyLists,
} from "../../lib/db/vocabularyLists";

//https://www.cram.com/flashcards/ato-a-school-test-211-635593

function VocabularyList({ list }: { list: VocabularyCardList }) {
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
          list={list.vocabularyCards}
          front={(option) => option.vocabularyCard.word}
          back={(option) => option.vocabularyCard.meaning}
        />
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const lists = await getVocabularyLists();
  const paths = lists.map((item) => {
    return { params: { id: item.id.toString() } };
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const list = await getVocabularyList(parseInt(params.id), {
    include: {
      vocabularyCards: {
        select: {
          vocabularyCard: {
            select: { id: true, word: true, meaning: true },
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

export default VocabularyList;
