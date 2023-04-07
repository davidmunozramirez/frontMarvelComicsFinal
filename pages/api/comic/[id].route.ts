import { getComic } from "dh-marvel/services/marvel/marvel.service";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * No using it anymore, ill keept it to have a template for the future
 */


/**
 * handleDetails is a handler for the route, which fetches data of a specific comic and as a way to quickly check the values of a determine id
 * @param req 
 * @param res 
 * @author David Muñoz
 */
export default async function handleDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  if (method === "GET") {
    const comic = await getComic(Number(id));
    res.status(200).json({ comic: comic });
  } else {
    res.status(404).json({ message: `Comic with id: ${id} not found.` });
  }
}
