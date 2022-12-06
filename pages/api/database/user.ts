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
}

interface Request {
  method: string;
  body: RequestBody;
}

const handler = async (req: Request, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { user: userEmail, memo, date } = req.body;
    const YM = date.slice(0, 4) + '-' + date.slice(4, 6);

    const client = await connectToDatabase();
    const db = client.db();

    // findUser
    const user = await db.collection('users').findOne({ email: userEmail });

    const data = await db.collection('tasks').findOne({ email: userEmail });

    const newTasks = memo.map((item) => ({
      ...item,
      id: new ObjectId(),
      date: new Date().toISOString(),
    }));

    if (data) {
      try {
        console.log(userEmail);

        await db.collection('tasks').updateOne(
          { email: userEmail },
          {
            $push: {
              tasks: {
                $each: newTasks,
              },
            },
          }
        );
      } catch (error) {
        res.status(500).json({ message: 'Inserting task failed!' });
      }
    } else {
      try {
        console.log('first');

        await db.collection('tasks').updateOne(
          { _id: user?._id },
          {
            $set: {
              _id: user?._id,
              email: userEmail,
              tasks: newTasks,
            },
          },
          { upsert: true }
        );
        res.status(201).send({ message: 'Inserted tasks.' });
      } catch (error) {
        res.status(500).json({ message: 'Inserting task failed!' });
      }
    }

    client.close();
  }

  // if (!user) {
  //   try {
  //     result = await db.collection('tasks').insertOne({
  //       email: userEmail,
  //       tasks: newTasks,
  //     });
  //     res.status(201).send({ message: 'Inserted tasks.' });
  //   } catch (error) {
  //     res.status(500).json({ message: 'Inserting task failed!' });
  //   }
  // }
  // else {
  //   try {
  //     result = await db.collection('tasks').updateOne(
  //       { _id: user.id },
  //       {
  //         $push: {
  //           tasks: newTasks,
  //         },
  //       }
  //     );
  //     res.status(201).send({ message: 'Updated tasks.' });
  //   } catch (error) {
  //     res.status(500).json({ message: 'Updating task failed!' });
  //   }
  // }
};

export default handler;
