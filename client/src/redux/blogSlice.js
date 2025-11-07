import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
	blog: null,
	isLoading: false,
	success: false,
	isError: null,
};

// Slice
const blogSlice = createSlice({
	name: 'blog',
	initialState,
	reducers: {
		blogStart: state => {
			state.isError = null;
			state.isLoading = true;
			state.success = false;
			state.blog = null;
		},
		blogSuccess: (state, action) => {
			state.isError = null;
			state.blog = action.payload;
			state.isLoading = false;
			state.success = true;
		},
		blogFailure: (state, action) => {
			state.isError = action.payload;
			state.isLoading = false;
			state.success = false;
		},
		clearBlog: (state) => {
			state.isError = null;
			state.blog = null;
			state.isLoading = false;
			state.success = false;
		},
	},
});

export const { blogStart, blogSuccess, blogFailure, clearBlog } = blogSlice.actions;
export const selectBlog = state => state.blog.blog;

export default blogSlice.reducer;