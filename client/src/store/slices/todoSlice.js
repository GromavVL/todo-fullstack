import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  todo: [],
};

const todoSlice = createSlice({
  initialState,
  name: 'todo',
  reducers: {
    createTodo: (state, { payload }) => {
      state.todo.push({
        task: payload.todo,
        id: uuidv4(),
        isCompleted: false,
      });
    },
    deleteTodo: (state, { payload }) => {
      state.todo = state.todo.filter(t => t.id !== payload);
    },
    completeTodo: (state, { payload: { id, data } }) => {
      const completeTodoIndex = state.todo.findIndex(t => t.id === id);
      state.todo[completeTodoIndex] = {
        ...state.todo[completeTodoIndex],
        ...data,
      };
    },
    updateTodo: (state, { payload: { id, task } }) => {
      const todo = state.todo.find(t => t.id === id);
      if (todo) {
        todo.task = task;
      }
    },
  },
});

const { reducer, actions } = todoSlice;

export const { deleteTodo, completeTodo, createTodo, updateTodo } = actions;
export default reducer;
