import type { NextApiRequest, NextApiResponse } from "next";
import { createKanjiCards } from "../../lib/db/kanjiCards";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;
  try {
    switch (method) {
      case "POST": {
        const { kanji, onyomi, kunyomi, chapterId } = body;
        const grammarCard = await createKanjiCards(
          kanji,
          onyomi,
          kunyomi,
          chapterId
        );
        res.send({ data: grammarCard });
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
