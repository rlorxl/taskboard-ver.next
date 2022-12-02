import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Login from '../component/auth/login';

const HomePage = () => {
  return (
    <>
      <Login />
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default HomePage;
