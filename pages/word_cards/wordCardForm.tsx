import { Book, Chapter } from ".prisma/client";
import React, { useCallback, useState } from "react";
import Input from "../../components/input";
import Router from "next/router";

export default function WordCardForm({ books }: { books: Book[] }) {
  const [word, setWord] = useState("");
  const [reading, setReading] = useState("");

  const [book, setBook] = useState(books[0]);
  const [selectedBook, setSelectedBook] = useState(books[0].id.toString());
  const [chapterId, setChapterId] = useState(
    //@ts-ignore
    books[0].chapters[0].id.toString()
  );

  const handleWordCardCreate = useCallback(
    async (e) => {
      e.preventDefault();
      await fetch("api/word_cards", {
        body: JSON.stringify({
          word,
          reading,
          chapterId,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      Router.reload();
    },
    [chapterId, reading, word]
  );

  return (
    <form className="flex-col space-y-2" onSubmit={handleWordCardCreate}>
      <div className="flex space-x-2">
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
      <div className="flex space-x-2">
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
      <div className="flex space-x-2">
        <label htmlFor="book">Book:</label>
        <select
          id="book"
          name="book"
          className="border border-gray-500 rounded-sm focus:outline-none"
          value={selectedBook}
          onChange={(e) => {
            setBook(books.find((b) => b.id.toString() === e.target.value)!);
            setSelectedBook(e.target.value);
          }}
        >
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex space-x-2">
        <label htmlFor="chapter">Chapter:</label>
        <select
          id="chapter"
          name="chapter"
          className="border border-gray-500 rounded-sm focus:outline-none"
          value={chapterId}
          onChange={(e) => setChapterId(e.target.value)}
        >
          {/* @ts-ignore */}
          {book.chapters.map((chapter: Chapter) => (
            <option key={chapter.id} value={chapter.id}>
              {chapter.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Create</button>
    </form>
  );
}
