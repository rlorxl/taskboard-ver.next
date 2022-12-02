import { BiArrowFromLeft } from 'react-icons/bi';
import styled from 'styled-components';
import { Button } from '../../styles/theme';

const LogoutButton = () => {
  return (
    <BtnArea>
      <BiArrowFromLeft />
      Log out
    </BtnArea>
  );
};

const BtnArea = styled(Button)`
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  gap: 0.5em;
  color: #fff;
  svg {
    font-size: 1em;
  }
`;

export default LogoutButton;
