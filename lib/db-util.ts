import { MongoClient } from 'mongodb';

interface Props {
  client: MongoClient;
  user: string;
  date?: string;
}

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://joeun:kn4rcM6e0U1Ch2sP@cluster0.ufgv3as.mongodb.net/planit?retryWrites=true&w=majority'
  );
  return client;
};

export const getDateDocuments = async ({ client, user, date }: Props) => {
  const db = client.db();

  const result = await db
    .collection('tasks')
    .find({
      email: user,
      date: date,
    })
    .toArray();
  return result;
};

export const getAllDocuments = async ({ client, user }: Props) => {
  const db = client.db();

  const result = await db.collection('tasks').find({ email: user }).toArray();
  return result;
};
