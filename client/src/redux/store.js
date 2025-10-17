import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice.js';
import blogReducer from './blogSlice.js';
import commentReducer from './commentSlice.js';

export const store = configureStore({
	reducer: {
		auth: userReducer,
		blog: blogReducer,
		comment: commentReducer,
	},
});
