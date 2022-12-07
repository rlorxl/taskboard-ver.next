import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TaskModal from '../modal/task-modal';
import CreateButton from '../ui/create-button';
import TaskItem from './task-item';
import { useAppSelector } from '../../store/configStore.hooks';
import useFetch from '../../hooks/useFetch';

interface Contents {
  _id: string;
  id: string;
  content: string;
  category: string;
  completed: boolean;
  date: string;
}

// const fetchDate = async (req: { date: string; role: string }) => {
//   const response = await fetch('/api/database/user', {
//     method: 'POST',
//     body: JSON.stringify(req),
//     headers: { 'Content-Type': 'application/json' },
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || 'Something went wrong!');
//   }
// };

const Task = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newData, setNewData] = useState<Contents[]>([]);

  const { date, year, month } = useAppSelector((state) => state.date);

  const { data, isError } = useFetch();

  useEffect(() => {
    // fetchDate();
    // transform data to array
    if (data) {
      for (const key in data) {
        // console.log(Array.isArray(data[key])); // true
        setNewData(data[key]);
      }
    }
  }, [data]);

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
          {newData.map((item) => (
            <TaskItem key={item._id} contents={item} />
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
