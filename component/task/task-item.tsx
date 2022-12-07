import React from 'react';
import styled, { css } from 'styled-components';
import { AiOutlineDelete } from 'react-icons/ai';

interface Contents {
  _id: string;
  id: string;
  content: string;
  category: string;
  completed: boolean;
  date: string;
}

interface TaskItemProps {
  contents: Contents;
}

const TaskItem: React.FC<TaskItemProps> = (props) => {
  const { id, content, category, completed } = props.contents;

  const changeCompletedHandler = () => {
    // api
  };

  const deleteTaskHandler = () => {
    // api
  };

  return (
    <ItemWrap>
      <input type='checkbox' id={id} />
      <label htmlFor={id} onClick={changeCompletedHandler}>
        <div>
          <CheckIcon checked={completed} />
        </div>
        <div>
          <p>{content}</p>
          <p>
            {category}
            {completed === true && <Completed> · completed</Completed>}
          </p>
        </div>
      </label>
      <div>
        <AiOutlineDelete onClick={deleteTaskHandler} />
      </div>
    </ItemWrap>
  );
};

const ItemWrap = styled.li`
  width: 100%;
  background-color: #fff;
  border-radius: 1em;
  padding: 0.8em 1em;
  color: ${({ theme }) => theme.color.black};
  font-size: 1em;
  margin-bottom: 0.6em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  label {
    display: flex;
    align-items: center;
  }
  p {
    margin: 0;
    color: ${({ theme }) => theme.color.gray};
    font-size: 0.9em;
    margin-left: 8px;
  }
  [type='checkbox'] {
    display: none;
  }
  svg {
    margin-left: 8px;
    font-size: 1.2em;
  }
`;

const CheckIcon = styled.span<{ checked: boolean }>`
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.color.gray};
  margin-right: 8px;

  ${(props) =>
    props.checked &&
    css`
      background: ${({ theme }) => theme.color.carrot};
      border-color: ${({ theme }) => theme.color.carrot};
      position: relative;
      &::before {
        content: '';
        position: absolute;
        display: block;
        top: 5px;
        right: 5px;
        width: 7px;
        height: 4px;
        border: 1px solid #fff;
        border-width: 0 0 1.5px 1.5px;
        transform: rotate(-45deg);
      }
      & + span {
        color: ${({ theme }) => theme.color.gray};
        text-decoration: line-through;
      }
    `}
`;

const Completed = styled.span`
  color: ${({ theme }) => theme.color.carrot};
`;

export default TaskItem;
