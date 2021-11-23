import type { NextApiRequest, NextApiResponse } from "next";
import { createVocabularyList } from "../../lib/db/vocabularyLists";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;
  try {
    switch (method) {
      case "POST": {
        const { name, vocabularyIds } = body;
        const vocabularyList = await createVocabularyList(name, vocabularyIds);
        res.send({ data: vocabularyList });
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
