import { axiosInstance } from "../utilities/utiles.js";
import { blogStart, blogSuccess, blogFailure } from "./blogSlice.js";
import { blogsStart, blogsSuccess, blogsFailure, createBlogStart, createBlogSuccess, createBlogFailure } from "./blogsSlice.js";
import { blogsByCatStart, blogsByCatSuccess, blogsByCatFailure } from "./blogsByCatSlice.js";
import { createCommentStart, createCommentSuccess, createCommentFailure, commentsStart, commentsSuccess, commentsFailure } from "./commentSlice.js";
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
// @Blogs by Categories
export const blogsByCategory = (catId) => async dispatch => {
  dispatch(blogsByCatStart());
  try {
    const res = await axiosInstance.get(`blogs/blogs-by-category/${catId}`);
    dispatch(blogsByCatSuccess(res.data));
  } catch (error) {
    dispatch(blogsByCatFailure(error?.response?.data?.msg || "Failed to fetch blogs"));
    console.log(error || "Blogs fetch failed.");
  }
}

// @Delete blog

// @Write blog
export const uploadBlog = (uploadData, toast) => async dispatch => {
  dispatch(createBlogStart());
  try {
    const res = await axiosInstance.post("/blogs/write-blog", uploadData);
    dispatch(createBlogSuccess(res.data.data));
    toast.success("Successfully Uploaded the blog🥇");
  } catch (error) {
    dispatch(createBlogFailure(error?.response?.data?.msg || "Failed to upload blog"));
    toast.error(error?.response?.data?.msg || "Upload failed. Try again.");
  }
}

// @Write comment
export const uploadComment = (content, toast, blogId) => async dispatch => {
  dispatch(createCommentStart());
  try {
    const res = await axiosInstance.post(`/comment/write-comment/${blogId}`, content);
    dispatch(createCommentSuccess(res.data.data));
    toast.success("Successfully created a comment🥇");
  } catch (error) {
    dispatch(createCommentFailure(error?.response?.data?.msg || "Failed to upload blog"));
    toast.error(error?.response?.data?.msg || "Comment creation failed.");
    console.log(error?.response?.data)
  }
}

export const commentsByBlog = (blogId, toast, accessToken) => async dispatch => {
  dispatch(commentsStart());
  try {
    const res = await axiosInstance.get(`/comment/blog-comment/${blogId}`, { headers: { Authorization: `Bearer ${accessToken}` } });
    dispatch(commentsSuccess(res.data));
    // toast.success("Successfully fetced a comment🥇");
    console.log(res.data)
    console.log(accessToken)
  } catch (error) {
    dispatch(commentsFailure(error?.response?.data?.msg || "Failed to upload blog"));
    console.log(error || "Comment fetch failed.");
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