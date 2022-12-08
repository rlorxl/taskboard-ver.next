import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TaskModal from '../modal/task-modal';
import CreateButton from '../ui/create-button';
import TaskItem from './task-item';
import { useAppSelector } from '../../store/configStore.hooks';
import useFetch from '../../hooks/useFetch';
import { useSWRConfig } from 'swr';
import { useSession } from 'next-auth/react';
// import { deleteTask, updateTask } from '../../lib/db-util';

interface RequestBody {
  user?: string;
  memo?: {
    id: string;
    content: string;
    category: string;
    completed: boolean;
    date: string;
  }[];
  date?: string;
  _id?: never;
  completed?: boolean;
}

const updateTask = async (reqBody: RequestBody) => {
  await fetch('/api/database/task', {
    method: 'PUT',
    body: JSON.stringify(reqBody),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error.message || 'Something went wrong!'));
};

const deleteTask = async (reqBody: RequestBody) => {
  await fetch('/api/database/task', {
    method: 'DELETE',
    body: JSON.stringify(reqBody),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error.message || 'Something went wrong!'));
};

const Task = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { date, year, month } = useAppSelector((state) => state.date);

  const { data: session } = useSession();

  const id = session?.user?.email;

  const { data, isError } = useFetch();

  const { mutate } = useSWRConfig();

  const changeCompletedHandler = async (_id: never, completed: boolean) => {
    await updateTask({ _id, completed });
    mutate(`/api/database/${id}/${date}`);
  };

  const deleteTaskHandler = async (_id: never) => {
    await deleteTask({ _id });
    mutate(`/api/database/${id}/${date}`);
  };

  const show = () => {
    setShowModal(true);
  };

  const close = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && <TaskModal onClose={close} />}
      <TaskArea>
        <div>
          <Date>
            {year}/{month + 1}/{date.slice(6)}
          </Date>
          <CreateButton onShow={show} />
        </div>
        <ul>
          {data?.data.map((item: any) => (
            <TaskItem
              key={item._id}
              contents={item}
              onChangeCompleted={changeCompletedHandler}
              onDeleteTask={deleteTaskHandler}
            />
          ))}

          {isError && <p>일정을 가져오는데 실패했어요 😂</p>}
        </ul>
      </TaskArea>
    </>
  );
};

const TaskArea = styled.section`
  width: 35%;
  height: 100%;
  border-left: 1px solid ${({ theme }) => theme.color.gray};
  display: flow-root;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 3em;
  }
  ul {
    width: 100%;
    height: 420px;
    padding-left: 3em;
    margin-top: 2.5em;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Date = styled.span`
  font-size: 1.2em;
  color: ${({ theme }) => theme.color.carrot};
`;

export default Task;
