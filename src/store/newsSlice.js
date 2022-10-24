import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNewStories } from '../utils/api.js';

const initialState = {
  news: [],
  initLoading: true,
  loading: false,
  error: null,
  count: 0,
  nextCount: 100,
};

export const fetchNewStories = createAsyncThunk(
  'news/fetchNewStories',
  async (arg, { getState }) => {
    const state = getState().news;

    try {
      const data = await getNewStories(state.count, state.nextCount);

      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    finishInitLoading: (state) => {
      state.initLoading = false;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    incrementCount: (state, payload) => {
      state.count += payload;
    },
    incrementNextCount: (state, payload) => {
      state.nextCount += payload;
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

// Action creators are generated for each case reducer function
export const {
  finishInitLoading,
  setLoading,
  loadNews,
  incrementCount,
  incrementNextCount,
  resetState,
} = newsSlice.actions;

export default newsSlice.reducer;
