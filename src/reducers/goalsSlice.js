import { createSlice } from '@reduxjs/toolkit';

const goalsSlice = createSlice({
  name: 'goals',
  initialState: {
    value: [
      { name: 'Graduarme de la Universidad' }
    ],
  },
  reducers: {
    addGoal: (state, action) => {
      state.value.push(action.payload);
    },
    removeGoal: (state, action) => {
      state.value = state.value.filter(goal => goal.name !== action.payload);
    }
  }
});

export const { addGoal, removeGoal } = goalsSlice.actions;
export const selectGoals = (state) => state.goals.value;
export default goalsSlice.reducer;
