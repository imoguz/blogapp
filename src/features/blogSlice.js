import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  blogs: [],
  search: {},
  categories: [],
  activeBlog: {},
  comments: [],
  userBlogs: [],
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchSuccess: (state, { payload: { section, data } }) => {
      state[section] = data;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFail } = blogSlice.actions;

export default blogSlice.reducer;
