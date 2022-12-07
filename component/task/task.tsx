import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TaskModal from '../modal/task-modal';
import CreateButton from '../ui/create-button';
import TaskItem from './task-item';
import { useAppSelector } from '../../store/configStore.hooks';
import useFetch from '../../hooks/useFetch';

interface Data {
  // [index: string]: string | boolean | object;
  _id: never;
  id: string;
  content: string;
  category: string;
  completed: boolean;
  date: string;
  email: string;
}

const Task = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newData, setNewData] = useState([]);

  const { date, year, month } = useAppSelector((state) => state.date);

  const { data, isError } = useFetch();

  useEffect(() => {
    // transform data to array
    if (data) {
      for (const key in data) {
        // console.log(Array.isArray(data[key])); // true
        setNewData(data[key]);
      }
      // console.log(newData);
    }
  }, [data]);

  // const changeCompleted = (id: string) => {
  //   const currentUser: User = session?.user?.email;
  //   update({ user: currentUser });
  // };

  // const deleteTask = (id: string) => {};

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
          {newData.map((item: Data) => (
            <TaskItem
              key={item._id}
              contents={item}
              // onChangeCompleted={changeCompleted}
              // onDeleteTask={deleteTask}
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
