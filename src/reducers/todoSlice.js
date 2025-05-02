import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    value: [
      { id: 1, name: 'Caminar al perro', deadline: '2025-05-05', description: 'Sacar al perro por la mañana' }
    ],
  },
  reducers: {
    addTodo: (state, action) => {
      state.value.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.value = state.value.filter(todo => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, updatedTodo } = action.payload;
      const todoIndex = state.value.findIndex(todo => todo.id === id);
      if (todoIndex !== -1) {
        state.value[todoIndex] = { ...state.value[todoIndex], ...updatedTodo };
      }
    }
  }
});

export const { addTodo, removeTodo, editTodo } = todoSlice.actions;
export const selectTodos = (state) => state.todos.value;
export default todoSlice.reducer;
