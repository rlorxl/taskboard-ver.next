import { BiEdit } from 'react-icons/bi';
import styled from 'styled-components';
import LogoutButton from '../ui/logout-button';
import Input from '../ui/input';

const Intro = () => {
  return (
    <Container>
      <Title>Title</Title>
      <DescArea>
        <p>이달의 목표</p>
        <span>
          <BiEdit />
        </span>
      </DescArea>
      <LogoutButton />
    </Container>
  );
};

const Container = styled.section`
  width: 25%;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.color.gray};
  position: relative;
`;

const Title = styled.p`
  font-size: 2em;
  margin: 0.5em 0;
`;

const DescArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7em;
  font-size: 1.1em;
  svg {
    font-size: 1.2em;
    margin-top: 6px;
    cursor: pointer;
  }
  span div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const EditGoal = styled(Input)`
  width: 200px;
  height: 40px;
  outline: none;
  border: none;
  text-indent: 5px;
  font-size: 1em;
`;

export default Intro;
