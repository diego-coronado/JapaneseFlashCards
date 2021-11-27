import { useCallback, useState } from "react";
import { KanjiCard } from ".prisma/client";
import { BookWithChapter, ChapterWithCard } from "../../lib/types";
import Router from "next/router";
import Accordion from "../../components/accordion";
import Input from "../../components/input";
import CheckboxGroup from "../../components/checkboxGroup";
import Button from "../../components/button";

function KanjiListForm({ books }: { books: BookWithChapter[] }) {
  const [name, setName] = useState("");
  const [cards, setCards] = useState<KanjiCard[]>([]);

  const handleCreate = useCallback(
    async (e) => {
      e.preventDefault();
      await fetch("api/kanji_lists", {
        body: JSON.stringify({
          name,
          kanjiIds: cards.map((card) => card.id),
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
      {book?.map((book) => {
        if (!book.chapters) return null;

        return (
          <Accordion key={book.id} title={book.name}>
            {book.chapters.map((chapter: ChapterWithCard) => {
              if (!chapter.kanjiCard) return null;

              return (
                <Accordion key={chapter.id} title={chapter.name}>
                  <CheckboxGroup
                    //@ts-ignore
                    options={chapter.kanjiCard}
                    //@ts-ignore
                    selectedOptions={cards}
                    setSelectedOptions={setCards}
                    accessor={(item) => item.kanji}
                    className="flex flex-col flex-nowrap border border-gray-400 rounded-md sm:flex-wrap sm:h-80 "
                  />
                </Accordion>
              );
            })}
          </Accordion>
        );
      })}
      <Button onClick={handleCreate} title="Create" />
    </div>
  );
}

export default KanjiListForm;
