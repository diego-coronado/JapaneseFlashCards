import { getChapters } from "../../lib/db/chapters";
import { Book, Chapter } from ".prisma/client";
import ChapterForm from "./chapterForm";
import { useState } from "react";
import { useRouter } from "next/router";
import { getBooks } from "../../lib/db/books";
import GoBackButton from "../../components/goBackButton";

const ChapterCard = ({ chapter }: { chapter: Chapter }) => {
  return (
    <div className="border border-gray-400 rounded-md p-2 flex-col">
      <p>{`Chapter Name: ${chapter.name}`}</p>
      {/* @ts-ignore */}
      <p>{`Book: ${chapter.book.name}`}</p>
    </div>
  );
};

const Chapters = ({
  books,
  chapters,
}: {
  books: Book[];
  chapters: Chapter[];
}) => {
  const [showChapterForm, setShowChapterForm] = useState(false);
  const router = useRouter();

  return (
    <div className="margin-safe py-5 space-y-3">
      <GoBackButton />
      <h1>Chapters</h1>
      <button
        className="button py-1 px-2 rounded-md focus:outline-none border border-gray-400"
        onClick={() => setShowChapterForm((prev) => !prev)}
      >
        Create a new Chapter
      </button>
      {showChapterForm && <ChapterForm books={books} />}
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
  const chapters = await getChapters({
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      book: {
        select: {
          name: true,
        },
      },
    },
  });
  const books = await getBooks();

  return {
    props: {
      books,
      chapters,
    },
  };
}

export default Chapters;
