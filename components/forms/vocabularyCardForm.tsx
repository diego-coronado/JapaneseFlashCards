import { useCallback, useState } from "react";
import { Book, Chapter } from ".prisma/client";
import Router from "next/router";
import Button from "../button";
import Select from "../select";
import Input from "../input";

function VocabularyCardForm({ books }: { books: Book[] }) {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [book, setBook] = useState<Book | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);

  const handleVocabularyCardCreate = useCallback(
    async (e) => {
      e.preventDefault();
      await fetch("api/vocabulary_cards", {
        body: JSON.stringify({
          word,
          meaning,
          chapterId: chapter?.id,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      Router.reload();
    },
    [chapter, meaning, word]
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
        <label htmlFor="meaning">Meaning:</label>
        <Input
          id="meaning"
          name="meaning"
          value={meaning}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMeaning(e.target.value)
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
      <Button onClick={handleVocabularyCardCreate} title="Create" />
    </div>
  );
}

export default VocabularyCardForm;
