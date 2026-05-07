import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import userReduser from './slices/userSlice';

const store = configureStore({
  reducer: {
    todoTask: todoReducer,
    userCard: userReduser,
  },
});

export default store;
