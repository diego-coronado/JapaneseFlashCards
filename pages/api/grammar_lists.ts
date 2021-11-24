import type { NextApiRequest, NextApiResponse } from "next";
import { createGrammarList } from "../../lib/db/grammarLists";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;
  try {
    switch (method) {
      case "POST": {
        const { name, grammarIds } = body;
        const grammarList = await createGrammarList(name, grammarIds);
        res.send({ data: grammarList });
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
