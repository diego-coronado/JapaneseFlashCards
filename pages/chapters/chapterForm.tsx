import { useCallback, useState } from "react";
import { Book } from ".prisma/client";
import Router from "next/router";
import Button from "../../components/button";
import Input from "../../components/input";
import Select from "../../components/select";

export default function ChapterForm({ books }: { books: Book[] }) {
  const [name, setName] = useState("");
  const [book, setBook] = useState<Book | null>(
    books.length > 0 ? books[0] : null
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const res = await fetch("api/chapters", {
        body: JSON.stringify({
          name,
          bookId: book?.id,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      Router.reload();
    },
    [book, name]
  );

  return (
    <div className="flex-col space-y-2 border border-gray-400 rounded-md p-2">
      <div className="space-x-2 flex items-center">
        <label htmlFor="name">Name:</label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="space-x-2 flex items-center">
        <label htmlFor="bookId">Book:</label>
        <Select
          options={books}
          selectedOption={book}
          //@ts-ignore
          setSelectedOption={setBook}
          placeholder="Select a book"
        />
      </div>
      <Button title="Create" onClick={handleSubmit} />
    </div>
  );
}
