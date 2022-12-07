import { ObjectId } from 'mongodb';
import { NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';

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
  role?: string;
}

interface Request {
  method: string;
  body: RequestBody;
}

const handler = async (req: Request, res: NextApiResponse) => {
  const { user: userEmail, memo, date } = req.body;

  const client = await connectToDatabase();
  const db = client.db();

  const user = await db.collection('users').findOne({ email: userEmail });

  if (req.method === 'POST') {
    // const data = await db.collection('tasks').findOne({ email: userEmail });

    // const startTime = new Date('2022-12-01').toISOString();
    // const endTime = new Date('2022-12-08').toISOString();

    // console.log(startTime, endTime);

    const newTasks = memo.map((item) => ({
      ...item,
      date: date,
      email: userEmail,
    }));

    console.log(newTasks);

    try {
      await db.collection('tasks').insertMany(newTasks);
      res.status(201).send({ message: 'Inserted tasks.' });
    } catch (error) {
      res.status(500).json({ message: 'Inserting task failed!' });
    }
  }

  // * ------------------------ first try ------------------------------- * //
  // if (data) {
  //   try {
  //     console.log(userEmail);

  //     await db.collection('tasks').updateOne(
  //       { email: userEmail },
  //       {
  //         $push: {
  //           tasks: {
  //             $each: newTasks,
  //           },
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     res.status(500).json({ message: 'Inserting task failed!' });
  //   }
  // } else {
  //   try {
  //     console.log('first');

  //     await db.collection('tasks').updateOne(
  //       { _id: user?._id },
  //       {
  //         $set: {
  //           _id: user?._id,
  //           email: userEmail,
  //           tasks: newTasks,
  //         },
  //       },
  //       { upsert: true }
  //     );
  //     res.status(201).send({ message: 'Inserted tasks.' });
  //   } catch (error) {
  //     res.status(500).json({ message: 'Inserting task failed!' });
  //   }
  // }

  // client.close();
};

export default handler;
