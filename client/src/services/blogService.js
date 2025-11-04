// services/blogService.js
import { axiosInstance } from "../utilities/utiles.js";

export const fetchBlogs = async (signal) => {
  try {
    const res = await axiosInstance.get("/blogs/all-blogs", { signal });
    return res.data.data; // return only the blogs
  } catch (error) {
    if (axiosInstance.isCancel?.(error)) {
      console.log("Request canceled");
      return null;
    }
    throw error; // rethrow for component to handle
  }
};


export const fetchBlog = async (signal, id) => {
  try {
    const res = await axiosInstance.get(`/blog/${id}`, { signal });
    return res.data.data; // return only the blogs
  } catch (error) {
    if (axiosInstance.isCancel?.(error)) {
      console.log("Request canceled");
      return null;
    }
    throw error;
  }
};
