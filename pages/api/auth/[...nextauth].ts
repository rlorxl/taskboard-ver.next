import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/check-password.ts';
import { connectToDatabase } from '../../../lib/db';

interface Credentials {
  email: string;
  password: string;
}

// 인증절차
export default NextAuth({
  session: {
    strategy: 'jwt', // 기본설정도 true지만 명시적으로 설정함. (로그인 성공시 쿠키에 jwt토큰 생성 확인)
    maxAge: 3 * 60 * 60, // 3 hours
  },
  // handler함수는 NextAuth호출에 의해 생성된다. NextAuth를 호출할 때 객체를 전달하여(배열) NextAuth의 동작을 구성할 수 있다.
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      async authorize(credentials: Credentials, req) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection('users');

        // 유저 이메일 검사
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          // return null;
          throw new Error('No user Found!');
        }

        // 비밀번호 검사
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        // credentials.password: 사용자가 제출한 비밀번호
        // user.password: db의 user객체에 저장된 비밀번호

        if (!isValid) {
          throw new Error('Could not log you in!');
        }

        client.close();
        // authorize내부에 객체를 반환함으로써 인증 성공 여부를 알릴 수 있다.
        return { email: user.email }; // -> email이 JWT로 변환됨.
      },
    }),
  ],
  pages: {
    error: '/error',
    signIn: '/login',
    signOut: '/',
  },
});
