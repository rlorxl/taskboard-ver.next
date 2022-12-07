import { NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';
import {
  formattedDate,
  formattedMonth,
} from '../../../store/modules/date-slice';

interface Request {
  query: { id: string };
}

const THIS_YEAR = new Date().getFullYear();
const today = `${THIS_YEAR}${formattedMonth()}${formattedDate()}`;

const handler = async (req: Request, res: NextApiResponse) => {
  const userEmail = req?.query?.id;

  const client = await connectToDatabase();
  const db = client.db();

  // const user = await db.collection('users').findOne({ email: userEmail });

  try {
    // console.log(today);
    const documents = await db
      .collection('tasks')
      .find({
        email: userEmail,
        date: today,
      })
      .toArray();
    console.log(documents);
    res.status(200).send({ data: documents });
  } catch (error: any) {
    console.log(error.message);
  }
};

export default handler;
