import type { NextApiRequest, NextApiResponse } from "next";
import { createBook } from "../../lib/db/books";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;
  try {
    switch (method) {
      case "POST": {
        const { name } = body;
        const book = await createBook(name);
        res.send({ data: book });
        break;
      }
      default: {
        res.status(405).send({ error: `Method ${method} Not Allowed` });
      }
    }
  } catch (err) {
    console.log(err);
  }
}
