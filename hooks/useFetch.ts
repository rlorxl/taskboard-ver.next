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

const useFetch = (date?: string) => {
  const { data: session } = useSession();
  const id = session?.user?.email;

  const api = date ? `/api/database/${id}/${date}` : `/api/database/${id}`;

  const { data, error } = useSWR<Data>(
    api,
    (args) => fetch(args).then((res) => res.json()),
    { revalidateOnFocus: false }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useFetch;
