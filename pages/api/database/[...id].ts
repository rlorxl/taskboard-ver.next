import { NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';

interface Request {
  query: { id: string; date: string };
}

const handler = async (req: Request, res: NextApiResponse) => {
  const userEmail = req?.query?.id[0];
  const date = req?.query?.id[1];

  const client = await connectToDatabase();
  const db = client.db();

  try {
    const documents = await db
      .collection('tasks')
      .find({
        email: userEmail,
        date: date,
      })
      .toArray();
    res.status(200).json({ data: documents });
  } catch (error: any) {
    console.log(error.message);
  }
};

export default handler;
