import { Chapter, LEVEL, WordCard } from ".prisma/client";
import { useRouter } from "next/router";
import { getChapters } from "../../lib/db/chapters";
import { getWordCards } from "../../lib/db/wordCards";
import WordCardForm from "./wordCardForm";

const WordCards = ({
  chapters,
  levels,
  wordCards,
}: {
  chapters: Chapter[];
  levels: string[];
  wordCards: WordCard[];
}) => {
  const router = useRouter();

  return (
    <div className="margin-safe py-5 space-y-3">
      <div onClick={() => router.back()} className="text-xs">
        Go back
      </div>
      <WordCardForm chapters={chapters} levels={levels} />
    </div>
  );
};

export async function getServerSideProps() {
  const levels = Object.keys(LEVEL);
  const chapters = await getChapters({
    where: {
      type: "word",
    },
  });
  const wordCards = await getWordCards();

  return {
    props: {
      chapters,
      levels,
      wordCards,
    },
  };
}

export default WordCards;
