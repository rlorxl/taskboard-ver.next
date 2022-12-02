import styled from 'styled-components';

const color = {
  carrot: '#f55f2f',
  carrot50: '#ffa78b',
  carrot25: '#FFDED3',
  black: '#19191c',
  gray: '#656565',
  error: '#FF0000',
};

export const Card = styled.div`
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

export const Button = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  border-radius: 15px;
`;

const theme = { color };

export default theme;
