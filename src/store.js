import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './reducers/todoSlice';
import goalsReducer from './reducers/goalsSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    goals: goalsReducer
  }
});

export default store;
