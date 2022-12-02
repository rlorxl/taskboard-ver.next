import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import styled from 'styled-components';
import { Button } from '../../styles/theme';

const MonthButton = () => {
  return (
    <BtnArea>
      <Arrow>
        <BiChevronLeft />
      </Arrow>
      <Arrow>
        <BiChevronRight />
      </Arrow>
    </BtnArea>
  );
};

const BtnArea = styled.div`
  width: 4em;
  display: flex;
  justify-content: space-between;
  svg {
    color: ${({ theme }) => theme.color.carrot};
  }
`;

const Arrow = styled(Button)`
  font-size: 1.4em;
`;

export default MonthButton;
