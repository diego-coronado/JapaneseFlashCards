import { useCallback, useState } from "react";
import { Book, TYPE } from ".prisma/client";
import Router from "next/router";

export default function ChapterForm({ books }: { books: Book[] }) {
  const [name, setName] = useState("");
  const [bookId, setbookId] = useState(books.length > 0 ? books[0].id : "");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await fetch("api/chapters", {
        body: JSON.stringify({
          name,
          bookId,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      Router.reload();
    },
    [bookId, name]
  );

  return (
    <form
      className="flex-col space-y-2 border border-gray-400 rounded-md p-2"
      onSubmit={handleSubmit}
    >
      <div className="space-x-2">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          className="border border-gray-500 rounded-sm focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="space-x-2">
        <label htmlFor="bookId">Book:</label>
        <select
          id="bookId"
          name="bookId"
          value={bookId}
          className="border border-gray-500 rounded-sm focus:outline-none"
          onChange={(e) => setbookId(e.target.value)}
        >
          {books.map((book) => (
            //@ts-ignore
            <option key={book.id} value={book.id}>
              {book.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="button py-1 px-2 rounded-md focus:outline-none border border-gray-400"
        disabled={name.length === 0}
      >
        Create
      </button>
    </form>
  );
}
