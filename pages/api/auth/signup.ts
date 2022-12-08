import { connectToDatabase } from '../../../lib/db-util';
import { hashPassword } from '../../../lib/check-password';
import { NextApiResponse } from 'next';

interface UserData {
  email: string;
  password: string;
}

interface Request {
  method: string;
  body: UserData;
}

const handler = async (req: Request, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;

  const { email, password } = data;

  console.log(password);

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  // check user already exist
  const existingUser = await db.collection('users').findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  await db.collection('users').insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: 'Created user!' });
  client.close();
};

export default handler;
