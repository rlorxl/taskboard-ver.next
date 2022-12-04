import { configureStore } from '@reduxjs/toolkit';
import dateSlice from './modules/date-slice';
import taskSlice from './modules/task-slice';

export const store = configureStore({
  reducer: {
    date: dateSlice.reducer,
    task: taskSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
