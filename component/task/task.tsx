import styled from 'styled-components';
import CreateButton from '../ui/create-button';

const Task = () => {
  return (
    <>
      {/* {showModal && <TaskModal onClose={close} />} */}
      <TaskArea>
        <div>
          <Date>{/* {year}/{month + 1}/{date.slice(6)} */}</Date>
          <CreateButton />
        </div>
        <ul></ul>
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
