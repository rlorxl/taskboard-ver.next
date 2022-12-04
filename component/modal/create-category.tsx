import React, { FormEvent, useRef } from 'react';
import { BiPlus } from 'react-icons/bi';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/configStore.hooks';
import { taskActions } from '../../store/modules/task-slice';
import { Button } from '../../styles/theme';
import CategoryItem from './category-item';

const CreateCategory = () => {
  const categoryInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.task);

  const addCategory = (event: React.FormEvent) => {
    event.preventDefault();

    if (categoryInputRef.current?.value.trim() !== '') {
      dispatch(taskActions.addCategory(categoryInputRef.current!.value));
      categoryInputRef.current!.value = '';
    }
  };

  const selectCategory = (name: string) => {
    dispatch(taskActions.setCategory(name));
  };

  const deleteCategory = (name: string) => {
    dispatch(taskActions.updateCategories(name));
  };

  return (
    <div>
      <TitleArea>
        <h3>Category</h3>
        <AddCategory>
          <form onSubmit={addCategory}>
            <input type='text' autoFocus ref={categoryInputRef} />
            <Button>
              <BiPlus />
            </Button>
          </form>
        </AddCategory>
      </TitleArea>
      <CategoryListArea>
        {categories &&
          categories.map((category) => (
            <CategoryItem
              key={category}
              item={category}
              onSelect={selectCategory}
              onDelete={deleteCategory}
            />
          ))}
      </CategoryListArea>
    </div>
  );
};

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    color: ${({ theme }) => theme.color.black};
    font-weight: normal;
    margin-top: 1.2em;
  }
  button {
    width: 35px;
    height: 35px;
    border: 1.5px solid ${({ theme }) => theme.color.carrot};
    border-radius: 8px;
    background: #fff;
    svg {
      font-size: 1.5em;
      color: ${({ theme }) => theme.color.carrot};
    }
    &:hover {
      background: #fff;
    }
  }
`;

const AddCategory = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 12em;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 1em;
    border-bottom: 1.5px solid ${({ theme }) => theme.color.carrot};
    padding: 0.4em;
    margin-right: 8px;
    color: ${({ theme }) => theme.color.black};
  }
`;

const CategoryListArea = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
`;

export default CreateCategory;
