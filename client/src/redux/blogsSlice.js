import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
	blogs: [],
	isFetching: false,
	success: false,
	error: null,
};

// Slice
const blogsSlice = createSlice({
	name: 'blogs',
	initialState,
	reducers: {
		// multiple blogs
		blogsStart: state => {
			state.error = false;
			state.isFetching = true;
			state.blogs = [], 
			state.success = false;
		},
		blogsSuccess: (state, action) => {
			state.error = false;
			state.blogs = action.payload;
			state.isFetching = false;
			state.success = true;
		},
		blogsFailure: (state, action) => {
			state.error = action.payload;
			state.isFetching = false;
			state.success = false;
		},
		// create blog
		createBlogStart: (state) => {
	      state.isFetching = true;
	      state.error = null;
	      state.success = false;
	    },
	    createBlogSuccess: (state, action) => {
	      state.isFetching = false;
	      state.blogs.push(action.payload); // add new blog to list
	      state.success = true;
	      state.error = null;
	    },
	    createBlogFailure: (state, action) => {
	      state.isFetching = false;
	      state.error = action.payload;
	      state.success = false;
	    },
	},
});

export const { blogsStart, blogsSuccess, blogsFailure, createBlogStart, createBlogSuccess, createBlogFailure } = blogsSlice.actions;
export const selectBlog = state => state.blogs;

export default blogsSlice.reducer;