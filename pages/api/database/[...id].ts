import { NextApiResponse } from "next";
import { connectToDatabase, getAllDocuments, getDateDocuments } from "../../../lib/db-util";

interface Request {
  query: { id: string; date?: string };
}

const handler = async (req: Request, res: NextApiResponse) => {
  const client = await connectToDatabase();

  const userEmail = req?.query?.id[0];
  const date = req?.query?.id[1];

  let documents;

  if (date) {
    try {
      documents = await getDateDocuments({ client, user: userEmail, date });
      res.status(200).json({ data: documents });
    } catch (error: any) {
      console.log(error.message);
    }
  } else {
    try {
      documents = await getAllDocuments({ client, user: userEmail });
      res.status(200).json({ data: documents });
    } catch (error: any) {
      console.log(error.message);
    }
  }
};

export default handler;
