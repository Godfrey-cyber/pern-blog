import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
	comments: [],
	comment: null,
	isFetching: false,
	success: false,
	error: null,
};

// Slice
const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {
		commentStart: state => {
			state.error = false;
			state.isFetching = true;
			state.success = false;
		},
		commentSuccess: (state, action) => {
			state.error = false;
			state.comment = action.payload;
			state.isFetching = false;
			state.success = true;
		},
		commentFailure: (state, action) => {
			state.error = action.payload;
			state.isFetching = false;
			state.success = false;
		},
		// multiple comments
		commentsStart: state => {
			state.error = false;
			state.isFetching = true;
			state.comments = [], 
			state.success = false;
		},
		commentsSuccess: (state, action) => {
			state.error = false;
			state.comments = action.payload;
			state.isFetching = false;
			state.success = true;
		},
		commentsFailure: (state, action) => {
			state.error = action.payload;
			state.isFetching = false;
			state.success = false;
		},
		// create blog
		createCommentStart: (state) => {
	      state.isFetching = true;
	      state.error = null;
	      state.success = false;
	    },
	    createCommentSuccess: (state, action) => {
	      state.isFetching = false;
	      state.comments.unshift(action.payload); // add new blog to list
	      state.success = true;
	      state.error = null;
	    },
	    createCommentFailure: (state, action) => {
	      state.isFetching = false;
	      state.error = action.payload;
	      state.success = false;
	    },
	},
});

export const { createCommentStart, createCommentSuccess, createCommentFailure } = commentSlice.actions;
export const selectComment = state => state.comment;

export default commentSlice.reducer;