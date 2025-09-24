import { axiosInstance } from "../utilities/utiles.js";
import { blogStart, blogSuccess, blogFailure, blogsStart, blogsSuccess, blogsFailure } from "./blogSlice.js";
import axios from "axios"

// @All blogs
export const fetchBlogs = () => async dispatch => {
  dispatch(blogsStart())
  try {
    const res = await axiosInstance.get("/blogs/all-blogs");
    dispatch(blogsSuccess(res.data.data))
  } catch (error) {
    dispatch(blogsFailure(error?.response?.data?.msg || "Failed to fetch blog"));
  }
};

// @One blog
export const fetchBlogById = (id) => async dispatch => {
	dispatch(blogStart());
	try {
		const res = await axiosInstance.get(`/blogs/blog/${id}`);
		dispatch(blogSuccess(res.data));
	} catch (error) {
    dispatch(blogFailure(error?.response?.data?.msg || "Failed to fetch blog"));
	}
}
// @My blogs

// @Update blog

// @Delete blog

// @Write blog

