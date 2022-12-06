import ReactDOM from 'react-dom';
import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../styles/theme';
import BackDrop from '../ui/modal/backdrop';
import Modal from '../ui/modal/modal';
import CreateCategory from './create-category';
import CreateMemo from './create-memo';
import { useAppDispatch, useAppSelector } from '../../store/configStore.hooks';
import { taskActions } from '../../store/modules/task-slice';
import { BiErrorCircle } from 'react-icons/bi';
import { useSession } from 'next-auth/react';

interface ModalProps {
  onClose: () => void;
}

interface MemoState {
  id: string;
  content: string;
}

interface RequestBody {
  user: string;
  memo: {
    id: string;
    content: string;
    category: string;
    completed: boolean;
    date: string;
  }[];
  date: string;
}

const createRandomId = () => {
  return Math.random().toString(36).substring(2, 12);
};

const taskUpload = async (reqBody: RequestBody) => {
  const response = await fetch('/api/database/user', {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
};

const TaskModal: React.FC<ModalProps> = (props) => {
  const { data: session } = useSession();

  const dispatch = useAppDispatch();

  const { selectedCategory } = useAppSelector((state) => state.task);
  const { date } = useAppSelector((state) => state.date);

  const [memos, setMemos] = useState<MemoState[]>([
    {
      id: createRandomId(),
      content: '',
    },
  ]);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const closeModal = () => {
    dispatch(taskActions.clear());
    props.onClose();
  };

  const createTask = async () => {
    let isContentExisted = memos.find((memo) => memo.content !== '');

    if (selectedCategory === '') {
      setError((prev) => !prev);
      setErrorMessage('카테고리를 선택해 주세요.');
      return;
    } else if (!isContentExisted) {
      setError((prev) => !prev);
      setErrorMessage('입력된 메모가 없습니다.');
      return;
    }

    const filteredMemos = memos
      .filter((memo) => memo.content !== '')
      .map((memo) => ({
        ...memo,
        category: selectedCategory,
        completed: false,
        date: date,
      }));

    // console.log(filteredMemos);

    if (typeof session?.user?.email === 'string') {
      const currentUser: string = session?.user?.email;
      await taskUpload({ user: currentUser, memo: filteredMemos, date });
    }

    // http request (POST)
    // closeModal();
  };

  const ModalChildren = (
    <>
      <h2>New Task</h2>
      <CreateCategory />
      <CreateMemo memos={memos} setMemos={setMemos} />
      {error && errorMessage !== '' && (
        <ErrorMessage>
          <BiErrorCircle />
          {errorMessage}
        </ErrorMessage>
      )}
      <BtnArea>
        <CloseBtn onClick={closeModal}>Cancel</CloseBtn>
        <CreateBtn onClick={createTask}>Create</CreateBtn>
      </BtnArea>
    </>
  );

  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop />,
        document.querySelector('#backdrop-root')! as HTMLDivElement
      )}
      {ReactDOM.createPortal(
        <Modal>{ModalChildren}</Modal>,
        document.querySelector('#modal-root')! as HTMLDivElement
      )}
    </>
  );
};

const BtnArea = styled.div`
  position: absolute;
  bottom: 25px;
  right: 25px;
  button {
    width: 120px;
    height: 55px;
    font-size: 1.1em;
  }
`;

const CloseBtn = styled(Button)`
  margin-right: 15px;
  border: 1.5px solid ${({ theme }) => theme.color.gray};
  color: ${({ theme }) => theme.color.gray};
  &:hover {
    background-color: rgba(101, 101, 101, 0.25);
    color: ${({ theme }) => theme.color.gray};
  }
`;

const CreateBtn = styled(Button)`
  border: 1.5px solid ${({ theme }) => theme.color.carrot};
  color: ${({ theme }) => theme.color.carrot};
  &:hover {
    background-color: ${({ theme }) => theme.color.carrot};
    color: #fff;
  }
`;

const ErrorMessage = styled.p`
  position: absolute;
  bottom: 25px;
  left: 40%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.error};
  svg {
    font-size: 1.3em;
    margin-right: 3px;
    transform: translateY(-2px);
  }
`;

export default TaskModal;
