import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
	categories: null,
	isFetching: false,
	success: false,
	error: null,
};

// Slice
const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		categoryStart: state => {
			state.error = false;
			state.isFetching = true;
			state.success = false;
		},
		categorySuccess: (state, action) => {
			state.error = false;
			state.categories = action.payload;
			state.isFetching = false;
			state.success = true;
		},
		categoryFailure: (state, action) => {
			state.error = action.payload;
			state.isFetching = false;
			state.success = false;
		},
	},
});

export const { categoryStart, categorySuccess, categoryFailure } = categorySlice.actions;
export const selectCategory = state => state.category.categories;

export default categorySlice.reducer;