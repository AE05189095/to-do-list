import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodosFromAPI, addTodoToAPI, deleteTodoFromAPI } from './todosAPI';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetchTodosFromAPI();
  return response;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const response = await addTodoToAPI(todo);
  return response.task; // Ajustado para esperar response.task
});

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id) => {
  await deleteTodoFromAPI(id);
  return id;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.loading = false;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo._id !== action.payload);
        state.loading = false;
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectTodos = (state) => state.todos.todos;
export const selectTodosLoading = (state) => state.todos.loading;
export const selectTodosError = (state) => state.todos.error;

export default todoSlice.reducer;