import type { NextApiRequest, NextApiResponse } from "next";
import { createGrammarCard } from "../../lib/db/grammarCards";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;
  try {
    switch (method) {
      case "POST": {
        const { point, structure, definition, chapterId } = body;
        const grammarCard = await createGrammarCard(
          point,
          structure,
          definition,
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
