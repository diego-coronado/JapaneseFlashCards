import { TYPE } from ".prisma/client";
import Router from "next/router";
import { useCallback, useState } from "react";
import Input from "../../components/input";
import { Type } from "../../lib/types";

export default function BookForm({ types }: { types: Type[] }) {
  const [type, setType] = useState(types[0].id);
  const [name, setName] = useState("");

  const handleCreateBook = useCallback(
    async (e) => {
      e.preventDefault();
      await fetch("api/books", {
        body: JSON.stringify({
          name,
          type,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      Router.reload();
    },
    [name, type]
  );

  return (
    <form onSubmit={handleCreateBook} className="flex-col space-y-2">
      <label htmlFor="name">Name:</label>
      <Input
        id="name"
        name="name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
        }}
      />
      <div className="space-x-2">
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          name="type"
          value={type}
          className="border border-gray-500 rounded-sm focus:outline-none"
          onChange={(e) => setType(e.target.value)}
        >
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Create</button>
    </form>
  );
}
