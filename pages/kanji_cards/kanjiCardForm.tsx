import { Book, Chapter } from ".prisma/client";
import Router from "next/router";
import { useCallback, useState } from "react";
import Button from "../../components/button";
import Input from "../../components/input";
import Select from "../../components/select";

function KanjiCardForm({ books }: { books: Book[] }) {
  const [kanji, setKanji] = useState("");
  const [onyomi, setOnyomi] = useState("");
  const [kunyomi, setKunyomi] = useState("");
  const [book, setBook] = useState<Book | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);

  const handleCreateKanjiCard = useCallback(
    async (e) => {
      e.preventDefault();
      await fetch("api/kanji_cards", {
        body: JSON.stringify({
          kanji,
          onyomi,
          kunyomi,
          chapterId: chapter?.id,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      Router.reload();
    },
    [chapter, kanji, kunyomi, onyomi]
  );

  return (
    <div className="flex-col space-y-2 border border-gray-400 rounded-md p-2">
      <div className="flex space-x-2 items-center">
        <label htmlFor="kanji">Kanji:</label>
        <Input
          id="kanji"
          name="kanji"
          value={kanji}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKanji(e.target.value)
          }
        />
      </div>
      <div className="flex space-x-2 items-center">
        <label htmlFor="onyomi">Onyomi:</label>
        <Input
          id="onyomi"
          name="onyomi"
          value={onyomi}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOnyomi(e.target.value)
          }
        />
      </div>
      <div className="flex space-x-2 items-center">
        <label htmlFor="kunyomi">Kunyomi:</label>
        <Input
          id="kunyomi"
          name="kunyomi"
          value={kunyomi}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKunyomi(e.target.value)
          }
        />
      </div>
      <div className="flex space-x-2 items-center">
        <label htmlFor="book">Book:</label>
        <Select
          options={books}
          selectedOption={book}
          //@ts-ignore
          setSelectedOption={setBook}
          placeholder="Select a book"
          allowNull={true}
        />
      </div>
      {book && (
        <div className="flex space-x-2 items-center">
          <label htmlFor="chapter">Chapter:</label>
          <Select
            //@ts-ignore
            options={book.chapters}
            selectedOption={chapter}
            //@ts-ignore
            setSelectedOption={setChapter}
            placeholder="Select a chapter"
          />
        </div>
      )}
      <Button onClick={handleCreateKanjiCard} title="Create" />
    </div>
  );
}

export default KanjiCardForm;
