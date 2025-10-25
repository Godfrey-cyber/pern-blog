import React, { useEffect, useState } from 'react'
import { uploadComment } from "../redux/commentsThunk.js"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Comments = ({ user }) => {
	const [commentData, setCommentData] = useState({
		content: ""
	});
	const dispatch = useDispatch()
	const { id, slug } = useParams();
	const { content, accessToken } = commentData
	const onChange = event => {
		const { name, value } = event.target;
		setCommentData((prev) => ({ ...prev, [name]: value }));
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (content.trim()) {
		    dispatch(uploadComment(commentData, toast, id));
		    setCommentData({ content:"" })
		} else {
	    toast.error("Something went wrong");
	  }
	}
	return (
		<div className="flex flex-col space-y-2 px-5 md:px-10 lg:px-20 my-8 w-full">
			<p className="text-xl font-bold text-green-700 decoration-underline">Leave a comment</p>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-3 w-full md:w-1/2">
				<textarea value={content} onChange={onChange} name="content" type="text" className="border border-green-500 h-44 p-2 outline-none focus:outline-none rounded-md placeholder:text-sm placeholder:text-gray-500 text-gray-700" id="" placeholder={`Hello ${user && user.username.split(" ")[0] || user && user.username}, What are your thoughts on this?`} />
				<button type="submit" className="text-white text-sm font-semibold bg-green-600 rounded-sm px-3 py-2 w-fit">SUBMIT</button>
			</form>
		</div>
	)
}

export default Comments // Elon  Musk is one of the most innovative and forward thinking person in the 21st century.