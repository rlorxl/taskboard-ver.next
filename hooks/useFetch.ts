import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { useAppSelector } from '../store/configStore.hooks';

interface Data {
  data: {
    _id: never;
    id: string;
    content: string;
    category: string;
    completed: boolean;
    date: string;
    email: string;
  }[];
}

const useFetch = () => {
  const { data: session } = useSession();
  const { date } = useAppSelector((state) => state.date);

  const id = session?.user?.email;

  const { data, error } = useSWR<Data>(
    `/api/database/${id}/${date}`,
    (args) => fetch(args).then((res) => res.json())
    // { refreshInterval: 1000 }
    // { revalidateOnFocus: true }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useFetch;
