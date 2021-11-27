import Router from "next/router";
import { useCallback, useState } from "react";
import Button from "../button";
import Input from "../input";
import Select from "../select";
import { Type } from "../../lib/types";

export default function BookForm({ types }: { types: Type[] }) {
  const [type, setType] = useState<Type | null>(types[0]);
  const [name, setName] = useState("");

  const handleCreateBook = useCallback(
    async (e) => {
      e.preventDefault();
      const res = await fetch("api/books", {
        body: JSON.stringify({
          name,
          type: type?.id,
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
    <div className="flex-col space-y-2 border border-gray-400 rounded-md p-2">
      <div className="flex items-center space-x-2">
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
        <label htmlFor="type">Type:</label>
        <Select
          options={types}
          selectedOption={type}
          //@ts-ignore
          setSelectedOption={setType}
          placeholder="Select a type"
        />
      </div>

      <Button onClick={handleCreateBook} title="Create" />
    </div>
  );
}
