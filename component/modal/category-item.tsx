import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { TiDeleteOutline } from 'react-icons/ti';
import { useAppSelector } from '../../store/configStore.hooks';

interface CategoryItemProps {
  item: string;
  onSelect: (name: string) => void;
  onDelete: (name: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = (props) => {
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const { selectedCategory } = useAppSelector((state) => state.task);

  const selectHandler = () => {
    props.onSelect(props.item);
  };

  const showDeleteIcon = () => {
    setShowIcon((prev) => !prev);
  };

  const deleteCategoryHandler = () => {
    props.onDelete(props.item);
  };

  return (
    <Category
      onClick={selectHandler}
      active={selectedCategory === props.item}
      onMouseEnter={showDeleteIcon}
      onMouseLeave={showDeleteIcon}
    >
      {props.item}
      <DeleteIcon>
        {showIcon && <TiDeleteOutline onClick={deleteCategoryHandler} />}
      </DeleteIcon>
    </Category>
  );
};

const Category = styled.li<{ active: boolean }>`
  padding: 12px 18px;
  border: 1.5px solid ${({ theme }) => theme.color.carrot};
  border-radius: 15px;
  color: ${({ theme }) => theme.color.carrot};
  cursor: pointer;
  position: relative;
  &:hover {
    color: #fff;
    background: ${({ theme }) => theme.color.carrot};
    span {
      width: 1.2em;
      height: 1.2em;
      color: ${({ theme }) => theme.color.carrot};
      background-color: #fff;
      border-radius: 50%;
    }
  }

  ${({ active }) =>
    active &&
    css`
      background: ${({ theme }) => theme.color.carrot};
      color: #fff;
    `}
`;

const DeleteIcon = styled.span`
  position: absolute;
  top: -7px;
  left: -7px;
  width: 1.6em;
  height: 1.6em;
  svg {
    position: absolute;
    top: -3px;
    left: -3px;
    font-size: 1.6em;
    z-index: 10;
  }
`;

export default CategoryItem;
