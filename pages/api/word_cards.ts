import type { NextApiRequest, NextApiResponse } from "next";
import { createWordCard } from "../../lib/db/wordCards";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;
  try {
    switch (method) {
      case "POST": {
        const { word, reading, chapterId } = body;
        const wordCard = await createWordCard(word, reading, chapterId);
        res.send({ data: wordCard });
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
