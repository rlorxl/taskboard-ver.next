import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/configStore.hooks';
import { dateActions, formattedDate } from '../../store/modules/date-slice';

interface DateProps {
  date: number;
  year: number;
  month: number;
}

interface ElementProps {
  today: boolean;
  isActive: boolean;
  ratio: number;
  existed: boolean;
}

const Day: React.FC<DateProps> = (props) => {
  const { date, year, month } = props;

  const [active, setActive] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [ratio, setRatio] = useState<number>(0);
  const [isTaskExisted, setIsTaskExisted] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { date: selectedDate } = useAppSelector((state) => state.date);
  const { tasks } = useAppSelector((state) => state.task);

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

  useEffect(() => {
    if (tasks.length === 0) {
      setIsTaskExisted(false);
      return;
    }

    tasks.forEach((task) => {
      const dateNum: number = Number(task.date.slice(-2));

      if (dateNum === date) {
        const ratio = ~~((task.completed / task.count) * 100);
        setRatio(Math.floor(ratio));
        setIsTaskExisted(true);
      }
    });
  }, [tasks]);

  const isToday =
    new Date().getFullYear() === year &&
    new Date().getMonth() === month &&
    new Date().getDate() === date;

  return (
    <Element
      today={isToday}
      isActive={active && isTouched}
      onClick={setDateHandler}
      ratio={ratio}
      existed={isTaskExisted}
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

    ${(props) =>
    props.ratio === 100 &&
    props.existed &&
    css`
      background: ${({ theme }) => theme.color.carrot};
      border-radius: 35%;
      color: #fff;
    `}
    ${(props) =>
    props.ratio >= 50 &&
    props.ratio < 100 &&
    props.existed &&
    css`
      background: ${({ theme }) => theme.color.carrot50};
      border-radius: 35%;
      color: #fff;
    `}
    ${(props) =>
    props.ratio < 50 &&
    props.existed &&
    css`
      background: ${({ theme }) => theme.color.carrot25};
      border-radius: 35%;
      color: ${({ theme }) => theme.color.carrot};
    `}
`;

export default Day;
