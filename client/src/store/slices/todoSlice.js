import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from './../../api';

const TODO_NAME_SHEMA = 'todo';

const initialState = {
  todo: [],
  isFetching: false,
  error: null,
};

export const getTodoThunk = createAsyncThunk(
  `${TODO_NAME_SHEMA}/get`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await API.getTodo();
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const createTodoThunk = createAsyncThunk(
  `${TODO_NAME_SHEMA}/create`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await API.createTodo({ body: payload.todo });
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  `${TODO_NAME_SHEMA}/delete`,
  async (payload, { rejectWithValue }) => {
    try {
      await API.deleteTodo(payload);
      return payload;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const updatedTodoThunk = createAsyncThunk(
  `${TODO_NAME_SHEMA}/update`,
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const { data: updatedTodo } = await API.updateTodo(id, body);

      return updatedTodo;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

const todoSlice = createSlice({
  initialState,
  name: TODO_NAME_SHEMA,
  reducers: {},
  extraReducers: builder => {
    // get
    builder.addCase(getTodoThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getTodoThunk.fulfilled, (state, { payload }) => {
      state.todo = [...payload];
      state.isFetching = false;
    });
    builder.addCase(getTodoThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

    // create
    builder.addCase(createTodoThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(createTodoThunk.fulfilled, (state, { payload }) => {
      state.todo.push(payload);
      state.isFetching = false;
    });
    builder.addCase(createTodoThunk.rejected, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(deleteTodoThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(deleteTodoThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.todo = state.todo.filter(t => t.id !== payload);
    });
    builder.addCase(deleteTodoThunk.rejected, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(updatedTodoThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(updatedTodoThunk.fulfilled, (state, { payload }) => {
      const updatedTodo = Array.isArray(payload) ? payload[0] : payload;
      const todo = state.todo.find(t => t.id === updatedTodo.id);

      if (todo) {
        Object.assign(todo, updatedTodo);
      }
      state.isFetching = false;
    });
    builder.addCase(updatedTodoThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  },
});

const { reducer } = todoSlice;

export default reducer;
