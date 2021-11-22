import { Book, Chapter } from ".prisma/client";
import Router from "next/router";
import { useCallback, useState } from "react";
import Button from "../../components/button";
import Input from "../../components/input";
import Select from "../../components/select";

export default function GrammarCardForm({ books }: { books: Book[] }) {
  const [point, setPoint] = useState("");
  const [structure, setStructure] = useState("");
  const [definition, setDefinition] = useState("");
  const [book, setBook] = useState<Book | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);

  const handleCreateGrammarCard = useCallback(
    async (e) => {
      e.preventDefault();
      await fetch("api/grammar_cards", {
        body: JSON.stringify({
          point,
          structure,
          definition,
          chapterId: chapter?.id,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      Router.reload();
    },
    [chapter, definition, point, structure]
  );

  return (
    <div className="flex-col space-y-2 border border-gray-400 rounded-md p-2">
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
      <Button onClick={handleCreateGrammarCard} title="Create" />
    </div>
  );
}
