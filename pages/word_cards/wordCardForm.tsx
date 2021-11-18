import { Chapter } from ".prisma/client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as R from "ramda";
import Input from "../../components/input";
import Router from "next/router";

export default function WordCardForm({
  chapters,
  levels,
}: {
  chapters: Chapter[];
  levels: string[];
}) {
  const byLevel = R.groupBy((chapter: Chapter) => chapter.level);
  const chaptersByLevel = useMemo(() => byLevel(chapters), [byLevel, chapters]);
  const [selectedLevel, setSelectedLevel] = useState(levels[0]);
  const [chaptersOnLevel, setChaptersOnLevel] = useState(
    //@ts-ignore
    chaptersByLevel[selectedLevel]
  );
  const [word, setWord] = useState("");
  const [reading, setReading] = useState("");
  const [chapterId, setChapterId] = useState("");

  useEffect(() => {
    //@ts-ignore
    const chaptersOnLevelArr = chaptersByLevel[selectedLevel] || [];
    setChaptersOnLevel(chaptersOnLevelArr);
    setChapterId(chaptersOnLevelArr.length > 0 ? chaptersOnLevelArr[0].id : "");
  }, [selectedLevel]);

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
      <div className="flex">
        <div>Level:</div>
        <select onChange={(e) => setSelectedLevel(e.target.value)}>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
      <div>
        {chaptersOnLevel?.length > 0 ? (
          <div className="flex">
            <div>Chapters:</div>
            <select
              onChange={(e) => {
                console.log(e.target.value);
                setChapterId(e.target.value);
              }}
            >
              {chaptersOnLevel?.map((chapter: Chapter) => (
                <option key={chapter.id} value={chapter.id}>
                  {chapter.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p>There are no chapters for this level</p>
        )}
      </div>
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
      <button type="submit">Create</button>
    </form>
  );
}
