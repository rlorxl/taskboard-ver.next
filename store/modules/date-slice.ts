import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const THIS_YEAR = new Date().getFullYear();
const THIS_MONTH = new Date().getMonth();
const THIS_DATE = new Date().getDate();

export const formattedMonth = (month = THIS_MONTH) => {
  const _month = month + 1;
  return _month < 10 ? '0' + _month : _month;
};

export const formattedDate = (date: number = THIS_DATE): string | number => {
  return date < 10 ? '0' + date : date;
};

interface DateState {
  date: string;
  year: number;
  month: number;
  day: number;
}

const initialStateValue: DateState = {
  date: `${THIS_YEAR}${formattedMonth()}${formattedDate()}`,
  year: THIS_YEAR,
  month: THIS_MONTH,
  day: new Date(THIS_YEAR, THIS_MONTH, 1).getDay(),
};

const dateSlice = createSlice({
  name: 'date',
  initialState: initialStateValue,
  reducers: {
    setDate: (state, action: PayloadAction<string | number>) => {
      const _month = state.month + 1;
      const formattedMonth = _month < 10 ? '0' + _month : _month;
      state.date = `${state.year}${formattedMonth}${action.payload}`;
    },
    increaseMonth: (state) => {
      if (state.month === 11) {
        state.month = 0;
        state.year += 1;
      } else {
        state.month += 1;
      }
      state.day = new Date(state.year, state.month, 1).getDay();
    },
    decreaseMonth: (state) => {
      if (state.month === 0) {
        state.month = 11;
        state.year -= 1;
      } else {
        state.month -= 1;
      }
      state.day = new Date(state.year, state.month, 1).getDay();
    },
  },
});

export const dateActions = dateSlice.actions;
export default dateSlice;
