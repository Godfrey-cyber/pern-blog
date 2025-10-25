import { axiosInstance } from "../utilities/utiles.js";
import { createCommentStart, createCommentSuccess, createCommentFailure } from "./commentSlice.js";

// @Write comment
export const uploadComment = (commentData, toast, id) => async dispatch => {
  dispatch(createCommentStart());
  try {
    const res = await axiosInstance.post(`/comment/write-comment/${id}`, commentData);
    dispatch(createCommentSuccess(res.data.data));
    toast.success(res.data.message, "🥇");
    console.log(res.data)
  } catch (error) {
    dispatch(createCommentFailure(error?.response?.data?.msg || "Failed to upload blog"));
    toast.error(error?.response?.data?.msg);
  }
}

export const editComment = async (res, req, next) => {
  // Implement your code here
}