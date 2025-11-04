import { axiosInstance } from "../utilities/utiles.js";
import { blogStart, blogSuccess, blogFailure, clearBlog } from "./blogSlice.js";
import { blogsStart, blogsSuccess, blogsFailure, clearBlogs, createBlogStart, createBlogSuccess, createBlogFailure } from "./blogsSlice.js";
import { blogsByCatStart, blogsByCatSuccess, blogsByCatFailure } from "./blogsByCatSlice.js";
import { categoryStart, categorySuccess, categoryFailure } from "./categorySlice.js";

// @All blogs
export const fetchBlogs = () => async dispatch => {
  dispatch(clearBlogs());
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
  dispatch(clearBlog());
	dispatch(blogStart());
	try {
		const res = await axiosInstance.get(`/blogs/blog/${id}`);
		dispatch(blogSuccess(res.data));
	} catch (error) {
    dispatch(blogFailure(error?.response?.data?.msg || "Failed to fetch blog"));
    console.log(error)
	}
}
// @Blogs by Categories
export const blogsByCategory = (catId) => async dispatch => {
  dispatch(clearBlogs());
  dispatch(blogsByCatStart());
  try {
    const res = await axiosInstance.get(`blogs/blogs-by-category/${catId}`);
    dispatch(blogsByCatSuccess(res.data.data));
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

// export const fetchCategories = () => async dispatch => {
//   dispatch(categoryStart())
//   try {
//     const res = await axiosInstance.get("categories/get-categories");
//     dispatch(categorySuccess(res.data.data))
//   } catch (error) {
//     dispatch(categoryFailure(error?.response?.data?.msg || "Failed to fetch blog"));
//   }
// };

// @All blogs
export const fetchCategories = () => async dispatch => {
  dispatch(categoryStart())
  try {
    const res = await axiosInstance.get("/category/get-categories");
    dispatch(categorySuccess(res.data.data))
  } catch (error) {
    dispatch(categoryFailure(error?.response?.data?.msg || "Failed to fetch blog"));
    console.log(error)
  }
};