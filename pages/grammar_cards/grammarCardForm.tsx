import { Book, Chapter } from ".prisma/client";
import Router from "next/router";
import { useCallback, useState } from "react";
import Input from "../../components/input";

export default function GrammarCardForm({ books }: { books: Book[] }) {
  console.log(books);
  const [point, setPoint] = useState("");
  const [structure, setStructure] = useState("");
  const [definition, setDefinition] = useState("");
  const [book, setBook] = useState(books[0]);
  const [selectedBook, setSelectedBook] = useState(books[0].id.toString());
  const [chapterId, setChapterId] = useState(
    //@ts-ignore
    books[0].chapters[0].id.toString()
  );

  const handleCreateGrammarCard = useCallback(
    async (e) => {
      e.preventDefault();
      await fetch("api/grammar_cards", {
        body: JSON.stringify({
          point,
          structure,
          definition,
          chapterId,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      Router.reload();
    },
    [chapterId, definition, point, structure]
  );

  return (
    <form className="flex-col space-y-2" onSubmit={handleCreateGrammarCard}>
      <div className="flex space-x-2">
        <label htmlFor="point">Point:</label>
        <Input
          id="point"
          name="point"
          value={point}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPoint(e.target.value)
          }
        />
      </div>
      <div className="flex space-x-2">
        <label htmlFor="structure">Structure:</label>
        <Input
          id="structure"
          name="structure"
          value={structure}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setStructure(e.target.value)
          }
        />
      </div>
      <div className="flex space-x-2">
        <label htmlFor="definition">Definition:</label>
        <Input
          id="definition"
          name="definition"
          value={definition}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDefinition(e.target.value)
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
      <button
        type="submit"
        className="button py-1 px-2 rounded-md focus:outline-none border border-gray-400"
        // disabled={name.length === 0}
      >
        Create
      </button>
    </form>
  );
}
