import type { NextApiRequest, NextApiResponse } from "next";
import { createChapter } from "../../lib/db/chapters";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;
  try {
    switch (method) {
      case "POST": {
        const { name, level, type } = body;
        const chapter = await createChapter(name, level, type);
        res.send({ data: chapter });
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
