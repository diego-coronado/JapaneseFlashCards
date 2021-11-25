import { Book, Chapter } from ".prisma/client";
import Router from "next/router";
import { useCallback, useState } from "react";
import Button from "../../components/button";
import Input from "../../components/input";
import Select from "../../components/select";
import { XCircleIcon } from "@heroicons/react/solid";

function KanjiCardForm({ books }: { books: Book[] }) {
  const [kanji, setKanji] = useState("");
  const [onyomiList, setOnyomiList] = useState<string[]>([]);
  const [kunyomiList, setKunyomiList] = useState<string[]>([]);
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
          onyomi: onyomiList,
          kunyomi: kunyomiList,
          chapterId: chapter?.id,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      Router.reload();
    },
    [chapter, kanji, kunyomiList, onyomiList]
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
      <div className="flex space-x-1 items-center">
        <label htmlFor="onyomi">Onyomi:</label>
        <Input
          id="onyomi"
          name="onyomi"
          value={onyomi}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOnyomi(e.target.value)
          }
        />
        <button
          className="bg-white py-0 px-1 border border-gray-400 rounded-md"
          onClick={() => {
            setOnyomiList((prev) => [...prev, onyomi]);
            setOnyomi("");
          }}
        >
          Add
        </button>
      </div>
      {onyomiList.length > 0 && (
        <ul className="list-disc">
          {onyomiList.map((item, i) => (
            <li key={item} className="flex items-center space-x-1">
              <div>{item}</div>
              <XCircleIcon
                className="text-gray-400 h-4 w-4 cursor-pointer"
                onClick={() => {
                  const arr = [...onyomiList];
                  arr.splice(i);
                  setOnyomiList(arr);
                }}
              />
            </li>
          ))}
        </ul>
      )}
      <div className="flex space-x-1 items-center">
        <label htmlFor="kunyomi">Kunyomi:</label>
        <Input
          id="kunyomi"
          name="kunyomi"
          value={kunyomi}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKunyomi(e.target.value)
          }
        />
        <button
          className="bg-white py-0 px-1 border border-gray-400 rounded-md"
          onClick={() => {
            setKunyomiList((prev) => [...prev, kunyomi]);
            setKunyomi("");
          }}
        >
          Add
        </button>
      </div>
      {kunyomiList.length > 0 && (
        <ul className="list-disc">
          {kunyomiList.map((item, i) => (
            <li key={item} className="flex items-center space-x-1">
              <div>{item}</div>
              <XCircleIcon
                className="text-gray-400 h-4 w-4 cursor-pointer"
                onClick={() => {
                  const arr = [...kunyomiList];
                  arr.splice(i);
                  setKunyomiList(arr);
                }}
              />
            </li>
          ))}
        </ul>
      )}
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
