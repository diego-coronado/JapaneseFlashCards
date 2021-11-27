import React, { useCallback, useState } from "react";
import { Book, Chapter } from ".prisma/client";
import Input from "../input";
import Router from "next/router";
import Button from "../button";
import Select from "../select";

export default function WordCardForm({ books }: { books: Book[] }) {
  const [word, setWord] = useState("");
  const [reading, setReading] = useState("");
  const [book, setBook] = useState<Book | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);

  const handleWordCardCreate = useCallback(
    async (e) => {
      e.preventDefault();
      await fetch("api/word_cards", {
        body: JSON.stringify({
          word,
          reading,
          chapterId: chapter?.id,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      Router.reload();
    },
    [chapter, reading, word]
  );

  return (
    <div className="flex-col space-y-2 border border-gray-400 rounded-md p-2">
      <div className="flex space-x-2 items-center">
        <label htmlFor="word">Word:</label>
        <Input
          id="word"
          name="word"
          value={word}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWord(e.target.value)
          }
        />
      </div>
      <div className="flex space-x-2 items-center">
        <label htmlFor="reading">Reading:</label>
        <Input
          id="reading"
          name="reading"
          value={reading}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setReading(e.target.value)
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
      <Button onClick={handleWordCardCreate} title="Create" />
    </div>
  );
}
