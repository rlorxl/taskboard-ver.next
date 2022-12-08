import { MongoClient } from 'mongodb';

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://joeun:kn4rcM6e0U1Ch2sP@cluster0.ufgv3as.mongodb.net/planit?retryWrites=true&w=majority'
  );
  return client;
};
