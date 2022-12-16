# next taskboard

- next.js
- next-auth
- redux-toolkit
- typescript
- mongodb

## 일정 데이터

pages/api/database/[...id]

`request.query`-date유무로 전체데이터인지 일부 날짜 데이터인지를 구분.

```jsx
// hooks/useFetch
const useFetch = (date?: string) => {
  const { data: session } = useSession(); // session 데이터
  const id = session?.user?.email;

  const api = date ? `/api/database/${id}/${date}` : `/api/database/${id}`;

  const { data, error } =
    useSWR < Data > (api, args => fetch(args).then(res => res.json()), { revalidateOnFocus: false });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

// pages/api/database/[...id]
const handler = async (req: Request, res: NextApiResponse) => {
  const client = await connectToDatabase();

  const userEmail = req?.query?.id[0];
  const date = req?.query?.id[1];

  let documents;

  if (date) {
    try {
      documents = await getDateDocuments({ client, user: userEmail, date }); // mongodb에서 email,date로 find하는 함수.
      res.status(200).json({ data: documents });
    } catch (error: any) {
      console.log(error.message);
    }
  } else {
    try {
      documents = await getAllDocuments({ client, user: userEmail }); // mongodb에서 email로 find하는 함수.
      res.status(200).json({ data: documents });
    } catch (error: any) {
      console.log(error.message);
    }
  }
};
```
