import React, { useEffect, useState } from 'react'
import { uploadBlog } from "../redux/blogThunk.js"
import { axiosInstance } from "../utilities/utiles.js"
import { uploadComment } from "../redux/blogThunk.js"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Comments = () => {
	const [commentData, setCommentData] = useState({
		content: ""
	});
	const dispatch = useDispatch()
	const { id, slug } = useParams();
	const { content } = commentData
	const onChange = event => {
		const { name, value } = event.target;
		setCommentData((prev) => ({ ...prev, [name]: value }));
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (content.trim()) {
		    dispatch(uploadComment({content}, toast, id));
		    setCommentData({ content:"" })
		} else {
	    toast.error("Something went wrong");
	  }
	}
	return (
		<div className="flex flex-col space-y-2 px-5 md:px-10 lg:px-20 my-28 w-full">
			<p className="text-xl font-bold text-green-700 decoration-underline">Leave a comment</p>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-3 w-2/5">
				<textarea value={content} onChange={onChange} name="content" type="text" className="border border-gray-300 h-44 p-2 outline-none focus:outline-none" id="" placeholder="Leave your comment" />
				<button type="submit" className="text-white text-sm font-semibold bg-green-600 rounded-sm px-3 py-2 w-fit">SUBMIT</button>
			</form>
		</div>
	)
}

export default Comments