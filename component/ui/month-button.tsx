import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import styled from 'styled-components';
import { Button } from '../../styles/theme';

type MonthProps = {
  onIncrease: () => void;
  onDecrease: () => void;
};

const MonthButton: React.FC<MonthProps> = (props) => {
  const decreaseMonthHandler = () => {
    props.onDecrease();
  };

  const increaseMonthHandler = () => {
    props.onIncrease();
  };

  return (
    <BtnArea>
      <Arrow onClick={decreaseMonthHandler}>
        <BiChevronLeft />
      </Arrow>
      <Arrow onClick={increaseMonthHandler}>
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
