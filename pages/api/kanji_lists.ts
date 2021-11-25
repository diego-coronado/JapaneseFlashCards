import type { NextApiRequest, NextApiResponse } from "next";
import { createKanjiList } from "../../lib/db/kanjiLists";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;
  try {
    switch (method) {
      case "POST": {
        const { name, kanjiIds } = body;
        const kanjiList = await createKanjiList(name, kanjiIds);
        res.send({ data: kanjiList });
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
