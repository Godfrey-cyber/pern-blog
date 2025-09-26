import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
	blogs: [],
	blog: null,
	isFetching: false,
	success: false,
	error: null,
};

// Slice
const blogSlice = createSlice({
	name: 'blog',
	initialState,
	reducers: {
		blogStart: state => {
			state.error = false;
			state.isFetching = true;
			state.success = false;
		},
		blogSuccess: (state, action) => {
			state.error = false;
			state.blog = action.payload;
			state.isFetching = false;
			state.success = true;
		},
		blogFailure: (state, action) => {
			state.error = action.payload;
			state.isFetching = false;
			state.success = false;
		},
		// multiple blogs
		blogsStart: state => {
			state.error = false;
			state.isFetching = true;
			state.blog = [], 
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

export const { blogStart, blogSuccess, blogFailure, blogsStart, blogsSuccess, blogsFailure, createBlogStart, createBlogSuccess, createBlogFailure } = blogSlice.actions;
export const selectBlog = state => state.blog.blog;

export default blogSlice.reducer;