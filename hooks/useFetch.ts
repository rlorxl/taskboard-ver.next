import { useSession } from 'next-auth/react';
import useSWR, { Key, Fetcher } from 'swr';
import { useAppSelector } from '../store/configStore.hooks';

interface Data {
  data: object;
}

const useFetch = () => {
  const { data: session } = useSession();
  const { date } = useAppSelector((state) => state.date);

  const id = session?.user?.email;

  const { data, error } = useSWR<Data | Error>(
    `/api/database/${id}/${date}`,
    (args) => fetch(args).then((res) => res.json())
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useFetch;
