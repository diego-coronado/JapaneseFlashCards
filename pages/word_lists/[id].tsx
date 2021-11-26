import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../../components/button";
import DeckSlider from "../../components/deckSlider";
import GoBackButton from "../../components/goBackButton";
import { WordCardListWithCards } from "../../lib/types";
import { getWordList, getWordLists } from "../../lib/db/wordLists";

type Option = {
  wordCard: {
    word: string;
    reading: string;
  };
};

//https://www.cram.com/flashcards/ato-a-school-test-211-635593
function WordList({ list }: { list: WordCardListWithCards }) {
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
          list={list.wordCards}
          front={(option: Option) => option.wordCard.word}
          back={(option: Option) => option.wordCard.reading}
        />
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const lists = await getWordLists();
  const paths = lists.map((item) => {
    return { params: { id: item.id.toString() } };
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const list = await getWordList(parseInt(params.id), {
    include: {
      wordCards: {
        select: {
          wordCard: {
            select: { id: true, word: true, reading: true },
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

export default WordList;
