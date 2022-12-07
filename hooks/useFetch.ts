import { useSession } from 'next-auth/react';
import useSWR from 'swr';

const useFetch = () => {
  const { data: session } = useSession();
  const id = session?.user?.email;

  const { data, error } = useSWR(`/api/database/${id}`, (api) =>
    fetch(api).then((res) => res.json())
  );

  return {
    session,
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useFetch;
