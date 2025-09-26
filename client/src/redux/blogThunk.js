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
export const uploadBlog = (uploadData, toast) => async dispatch => {
  dispatch(blogStart());
  try {
    const res = await axiosInstance.post("/blogs/write-blog", uploadData);
    dispatch(blogSuccess(res.data.data));
    toast.success("Successfully Uploaded the blog🥇");
  } catch (error) {
    dispatch(blogFailure(error?.response?.data?.msg || "Failed to upload blog"));
    toast.error(error?.response?.data?.msg || "Upload failed. Try again.");
  }
}


// export const fetchCategories = () => async dispatch => {
//   dispatch(categoryStart())
//   try {
//     const res = await axiosInstance.get("categories/get-categories");
//     dispatch(categorySuccess(res.data.data))
//   } catch (error) {
//     dispatch(categoryFailure(error?.response?.data?.msg || "Failed to fetch blog"));
//   }
// };