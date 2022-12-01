import { MongoClient } from 'mongodb';

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://joeun:Qb9iTUuSDRrQ0X1y@cluster0.ufgv3as.mongodb.net/planit?retryWrites=true&w=majority'
  );
  return client;
};
