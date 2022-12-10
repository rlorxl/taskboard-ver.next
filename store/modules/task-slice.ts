import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Data {
  date: string;
  count: number;
  completed: number;
}

interface TaskState {
  selectedCategory: string;
  categories: string[];
  tasks: Data[];
  goal: string;
  notification: { status: string; message: String };
}

const initialStateValue: TaskState = {
  selectedCategory: '',
  categories: [],
  tasks: [],
  goal: '',
  notification: { status: '', message: '' },
};

const taskSlice = createSlice({
  name: 'task',
  initialState: initialStateValue,
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      const isExisted = state.categories.includes(action.payload);
      if (isExisted) return;
      else state.categories.push(action.payload);
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    updateCategories: (state, action: PayloadAction<string>) => {
      const newCategories = state.categories.filter(
        (category) => category !== action.payload
      );
      state.categories = newCategories;
    },
    setTasks: (state, action: PayloadAction<Data[]>) => {
      state.tasks = action.payload;
    },
    // setGoal: (state, action) => {
    //   state.goal = action.payload.text;
    // },
    // setNotification: (state, action) => {
    //   state.notification = {
    //     status: action.payload.status,
    //     message: action.payload.message,
    //   };
    // },
    clear: (state) => {
      state.selectedCategory = '';
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice;
