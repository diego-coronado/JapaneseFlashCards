import type { NextApiRequest, NextApiResponse } from "next";
import { createVocabularyCard } from "../../lib/db/vocabularyCards";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;
  try {
    switch (method) {
      case "POST": {
        const { word, meaning, chapterId } = body;
        const vocabularyCard = await createVocabularyCard(
          word,
          meaning,
          chapterId
        );
        res.send({ data: vocabularyCard });
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
