import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGoalsFromAPI, addGoalToAPI, deleteGoalFromAPI } from './goalsAPI';

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
  const response = await fetchGoalsFromAPI();
  return response;
});

export const addGoal = createAsyncThunk('goals/addGoal', async (goal) => {
  const response = await addGoalToAPI(goal);
  return response.goal;
});

export const removeGoal = createAsyncThunk('goals/removeGoal', async (id) => {
  await deleteGoalFromAPI(id);
  return id;
});

const goalsSlice = createSlice({
  name: 'goals',
  initialState: {
    goals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.goals = action.payload;
        state.loading = false;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.goals.push(action.payload);
        state.loading = false;
      })
      .addCase(addGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeGoal.fulfilled, (state, action) => {
        state.goals = state.goals.filter(goal => goal._id !== action.payload);
        state.loading = false;
      })
      .addCase(removeGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectGoals = (state) => state.goals.goals;
export const selectGoalsLoading = (state) => state.goals.loading;
export const selectGoalsError = (state) => state.goals.error;

export default goalsSlice.reducer;