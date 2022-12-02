import styled from 'styled-components';

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <CardWrap>{children}</CardWrap>;
};

const CardWrap = styled.div`
  max-width: 1600px;
  height: 600px;
  margin: 3rem auto 5rem;
  border-radius: 20px;
  padding: 2.5em 4em;
  background-color: #19191c;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media screen and (max-width: 720px) {
    max-width: 480px;
    padding: 2em;
  }
`;

export default Card;
