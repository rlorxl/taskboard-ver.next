import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/configStore.hooks';
import {
  dateActions,
  formattedDate,
  formattedMonth,
} from '../../store/modules/date-slice';

type DateProps = {
  date: number;
  year: number;
  month: number;
};

type ElementProps = {
  today: boolean;
  isActive: boolean;
};

const Day: React.FC<DateProps> = (props) => {
  const { date, year, month } = props;
  const [active, setActive] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { date: selectedDate } = useAppSelector((state) => state.date);

  const _date = formattedDate(date);

  const setDateHandler = () => {
    dispatch(dateActions.setDate(_date));

    setIsTouched(true);
  };

  useEffect(() => {
    setActive(false);

    if (_date.toString() === selectedDate.slice(6)) {
      setActive(true);
    }
  }, [selectedDate]);

  const isToday =
    new Date().getFullYear() === year &&
    new Date().getMonth() === month &&
    new Date().getDate() === date;

  return (
    <Element
      today={isToday}
      isActive={active && isTouched}
      onClick={setDateHandler}
    >
      {date >= 0 && date}
    </Element>
  );
};

const Element = styled.div<ElementProps>`
  width: 50px;
  height: 50px;
  margin-bottom: 0.5em;
  font-size: 1.2em;
  color: ${({ theme }) => theme.color.carrot};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  cursor: pointer;

  &:hover {
    border: 1.5px solid ${({ theme }) => theme.color.carrot};
    border-radius: 35%;
  }

  ${(props) =>
    props.today &&
    css`
      &::after {
        content: '';
        position: absolute;
        bottom: 13%;
        width: 5px;
        height: 5px;
        background: ${({ theme }) => theme.color.carrot};
        border-radius: 50%;
      }
    `}

  ${(props) =>
    props.isActive &&
    css`
      border: 1.5px solid ${({ theme }) => theme.color.carrot};
      border-radius: 35%;
    `}
`;

export default Day;
