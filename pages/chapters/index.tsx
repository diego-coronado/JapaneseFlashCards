import { getChapters } from "../../lib/db/chapters";
import { Chapter, LEVEL, TYPE } from ".prisma/client";
import ChapterForm from "./chapterForm";
import { useState } from "react";
import { useRouter } from "next/router";

const ChapterCard = ({ chapter }: { chapter: Chapter }) => {
  return (
    <div className="border border-gray-400 rounded-md p-2 flex-col">
      <p>{`Name: ${chapter.name}`}</p>
      <p>{`Level: ${chapter.level}`}</p>
      <p>{`Type: ${chapter.type}`}</p>
    </div>
  );
};

const Chapters = ({
  chapters,
  levels,
  types,
}: {
  chapters: Chapter[];
  levels: LEVEL;
  types: TYPE;
}) => {
  const [showChapterForm, setShowChapterForm] = useState(false);
  const router = useRouter();

  return (
    <div className="margin-safe py-5 space-y-3">
      <div onClick={() => router.back()} className="text-xs">Go back</div>
      <h1>Chapters</h1>
      <button
        className="button py-1 px-2 rounded-md focus:outline-none border border-gray-400"
        onClick={() => setShowChapterForm((prev) => !prev)}
      >
        Create a new Chapter
      </button>
      {showChapterForm && <ChapterForm levels={levels} types={types} />}
      <div>List of chapters:</div>
      {chapters.length > 0 ? (
        <ul className="space-y-2">
          {chapters.map((chapter) => (
            <ChapterCard chapter={chapter} key={chapter.id} />
          ))}
        </ul>
      ) : (
        <p>There are no chapters created yet</p>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const chapters = await getChapters();
  const levels = LEVEL;
  const types = TYPE;

  return {
    props: {
      chapters,
      levels,
      types,
    },
  };
}

export default Chapters;
