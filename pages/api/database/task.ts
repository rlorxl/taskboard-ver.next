import { ObjectId } from 'mongodb';
import { NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db-util';

interface RequestBody {
  user: string;
  memo: {
    id: string;
    content: string;
    category: string;
    date: string;
    completed: boolean;
  }[];
  date: string;
  _id?: never;
  completed?: boolean;
}

interface Request {
  method: string;
  body: RequestBody;
}

const handler = async (req: Request, res: NextApiResponse) => {
  const client = await connectToDatabase();
  const db = client.db();

  if (req.method === 'POST') {
    const { user: userEmail, memo, date } = req.body;

    const tasks = memo?.map((item) => ({
      ...item,
      date: date,
      email: userEmail,
    }));

    try {
      const result = await db.collection('tasks').insertMany(tasks);

      if (result) {
        res.status(201).json({ message: 'Inserted tasks.' });
      }
    } catch (error) {
      if (error instanceof TypeError || error instanceof SyntaxError) {
        console.log(error.message);
        res.status(500).json({ message: 'Inserting task failed!' });
      }
    }
  }

  if (req.method === 'PUT') {
    const { _id, completed } = req.body;

    try {
      const query = { _id: new ObjectId(_id) };
      const result = await db
        .collection('tasks')
        .updateOne(query, { $set: { completed: !completed } });

      if (result) {
        res.status(200).json({ message: 'Successfully updated task.' });
      }
    } catch (error) {
      if (error instanceof TypeError || error instanceof SyntaxError) {
        console.log(error.message);
        res.status(304).json({ message: 'Updating task failed!' });
      }
    }
  }

  if (req.method === 'DELETE') {
    const { _id } = req.body;

    try {
      const query = { _id: new ObjectId(_id) };
      const result = await db.collection('tasks').deleteOne(query);
      if (result && result.deletedCount) {
        res.status(202).json({ message: 'Successfully removed task.' });
      } else {
        res.status(404).json({ message: 'Task does not exist.' });
      }
    } catch (error) {
      if (error instanceof TypeError || error instanceof SyntaxError) {
        console.log(error.message);
        res.status(304).json({ message: 'Updating task failed!' });
      }
    }
  }
};

export default handler;
