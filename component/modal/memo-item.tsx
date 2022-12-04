import React from 'react';
import styled from 'styled-components';

interface MemoItemProps {
  id: string;
  onAddItem: (name: string, value: string) => void;
  onRemoveItem: (id: string) => void;
}

const MemoItem: React.FC<MemoItemProps> = (props) => {
  const { id, onAddItem, onRemoveItem } = props;

  const addMemoHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    onAddItem(name, value);
  };

  const removeMemoHandler = () => {
    onRemoveItem(id);
  };

  return (
    <Memo>
      <textarea
        name={id}
        placeholder='일정을 입력하세요'
        onChange={addMemoHandler}
        autoFocus
      ></textarea>
      <button onClick={removeMemoHandler}>X</button>
    </Memo>
  );
};

const Memo = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  textarea {
    font-size: 0.9rem;
    width: 100%;
    height: 3rem;
    border: none;
    outline: none;
    background-color: transparent;
    color: ${({ theme }) => theme.color.black};
    font-size: 1rem;
    line-height: 1.2rem;
    padding: 1rem 0;
    resize: none;
    overflow: hidden;
  }
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.color.gray};
    opacity: 0.3;
  }
  &:last-child::after {
    opacity: 0;
  }
`;

export default MemoItem;
