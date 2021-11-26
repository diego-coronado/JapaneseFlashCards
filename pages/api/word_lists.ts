import type { NextApiRequest, NextApiResponse } from "next";
import { createWordList } from "../../lib/db/wordLists";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;
  try {
    switch (method) {
      case "POST": {
        const { name, wordIds } = body;
        const wordCardList = await createWordList(name, wordIds);
        res.send({ data: wordCardList });
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
