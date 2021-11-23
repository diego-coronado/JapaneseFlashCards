import { useCallback, useState } from "react";
import Router from "next/router";
import Accordion from "../../components/accordion";
import { Book, Chapter } from ".prisma/client";
import CheckboxGroup from "../../components/checkboxGroup";
import Button from "../../components/button";
import Input from "../../components/input";

function VocabularyListForm({ books }: { books: Book[] }) {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);

  const handleVocabularyCardCreate = useCallback(
    async (e) => {
      e.preventDefault();
      await fetch("api/vocabulary_lists", {
        body: JSON.stringify({
          name,
          vocabularyIds: cards.map((card) => card.id),
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      Router.reload();
    },
    [cards, name]
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
      {books.map((book) => {
        if (!book.chapters) return null;

        return (
          <Accordion key={book.id} title={book.name}>
            {book.chapters.map((chapter: Chapter) => {
              if (!chapter.vocabularyCard) return null;

              return (
                <Accordion key={chapter.id} title={chapter.name}>
                  <CheckboxGroup
                    options={chapter.vocabularyCard}
                    selectedOptions={cards}
                    setSelectedOptions={setCards}
                    accessor={(item) => item.word}
                    className="flex flex-col flex-nowrap border border-gray-400 rounded-md sm:flex-wrap sm:h-80 "
                  />
                </Accordion>
              );
            })}
          </Accordion>
        );
      })}
      <Button onClick={handleVocabularyCardCreate} title="Create" />
    </div>
  );
}

export default VocabularyListForm;
