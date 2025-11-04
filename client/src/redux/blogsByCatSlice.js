import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
	blogsByCat: [],
	isFetching: false,
	success: false,
	error: null,
};

// Slice
const blogsByCatSlice = createSlice({
	name: 'blogsByCat',
	initialState,
	reducers: {
		// multiple blogs
		blogsByCatStart: state => {
			state.error = false;
			state.isFetching = true;
			state.blogsByCat = [], 
			state.success = false;
		},
		blogsByCatSuccess: (state, action) => {
			state.error = false;
			state.blogsByCat = action.payload;
			state.isFetching = false;
			state.success = true;
		},
		blogsByCatFailure: (state, action) => {
			state.error = action.payload;
			state.isFetching = false;
			state.success = false;
		},
	},
});

export const { blogsByCatStart, blogsByCatSuccess, blogsByCatFailure } = blogsByCatSlice.actions;
export const selectBlogsByCat = state => state.blogsByCat;

export default blogsByCatSlice.reducer;