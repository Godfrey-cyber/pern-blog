import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice.js';
import blogReducer from './blogSlice.js';
import blogsReducer from './blogsSlice.js';
import blogsByCatSlice from './blogsByCatSlice.js';
import commentReducer from './commentSlice.js';

export const store = configureStore({
	reducer: {
		auth: userReducer,
		blog: blogReducer,
		blogs: blogsReducer,
		blogsByCat: blogsByCatSlice,
		comment: commentReducer,
	},
});