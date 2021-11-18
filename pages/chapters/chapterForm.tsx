import { useCallback, useState } from "react";
import { LEVEL, TYPE } from ".prisma/client";
import Router from "next/router";

export default function ChapterForm({
  levels,
  types,
}: {
  levels: LEVEL;
  types: TYPE;
}) {
  const levelKeys = Object.keys(levels);
  const typeKeys = Object.keys(types);

  const [level, setLevel] = useState(levels[levelKeys[0]]);
  const [type, setType] = useState(types[typeKeys[0]]);
  const [name, setName] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await fetch("api/chapters", {
        body: JSON.stringify({
          name,
          type,
          level,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      Router.reload();
    },
    [level, name, type]
  );

  return (
    <form className="flex-col space-y-2 border border-gray-400 rounded-md p-2" onSubmit={handleSubmit}>
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
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          name="type"
          value={type}
          className="border border-gray-500 rounded-sm focus:outline-none"
          onChange={(e) => setType(e.target.value)}
        >
          {typeKeys.map((type) => (
            //@ts-ignore
            <option key={type} value={types[type]}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="space-x-2">
        <label htmlFor="level">Level:</label>
        <select
          id="level"
          name="level"
          value={level}
          className="border border-gray-500 rounded-sm focus:outline-none"
          onChange={(e) => setLevel(e.target.value)}
        >
          {levelKeys.map((level) => (
            //@ts-ignore
            <option key={level} value={levels[level]}>
              {level}
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
