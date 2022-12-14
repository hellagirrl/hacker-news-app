import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNewStories } from '../utils/api.js';

const initialState = {
  news: [],
  initLoading: true,
  loading: false,
  error: null,
  count: 0,
  nextCount: 100,
  onStoryView: false,
  onMainView: true,
};

export const fetchNewStories = createAsyncThunk(
  'news/fetchNewStories',
  async (arg, { getState, dispatch }) => {
    const state = getState().news;
    try {
      const data = await getNewStories(state.count, state.nextCount);
      return data;
    } catch (e) {
      console.error(e);
      dispatch(setError(e));
    }
  }
);

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    showGoBack: (state, payload) => {
      state.onStoryView = payload;
    },
    showReload: (state, payload) => {
      state.onMainView = payload;
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewStories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchNewStories.fulfilled, (state, action) => {
        state.news.push(...action.payload);

        state.count = state.initLoading ? state.count + 100 : state.count + 20;
        state.nextCount += 20;

        state.initLoading = false;
        state.loading = false;
      })
      .addCase(fetchNewStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { showGoBack, showReload, resetState, setError } =
  newsSlice.actions;

export default newsSlice.reducer;
