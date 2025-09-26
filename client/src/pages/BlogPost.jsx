import { useParams, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from "react"
import axios from "axios"
// files
// import { fetchBlog } from "../services/blogService.js"
import { formatDate, axiosInstance } from "../utilities/utiles.js"
import BlogHeader from "../components/BlogHeader.jsx"
import { fetchBlogById } from "../redux/blogThunk.js"
import { useDispatch, useSelector } from "react-redux"

const BlogPost = () => {
	const navigation = useNavigate()
	const dispatch = useDispatch()
	const { blog, loading, error } = useSelector(state => state.blog);

	const { id, slug } = useParams();
	useEffect(() => {
	    if (!id) return;
	    // const controller = new AbortController();
	    dispatch(fetchBlogById(id))
	    // return () => controller.abort();
	  }, [id, dispatch]);
	if (loading) return <p>Loading blog...</p>;
	if (!blog) return <p className="text-sm font-bold-red-gray-500">Loading</p>
	return (
		<div className="flex flex-col w-full h-screen w-full">
		 	<BlogHeader />
			<div className="grid grid-cols-12 gap-4 lg:gap-8 px-5 md:px-10 lg:px-20 my-28">
				<div className="col-span-8 flex flex-col space-y-4">
					<p className="text-3xl font-bold text-black hover:text-amber-500">{blog.title}.</p>
					<img src="https://assets.citizen.digital/158317/conversions/Untitled-design-%2850%29-mainStory.webp" alt="" className="h-80 min-h-[350px] max-h-[400px] object-cover" />
					<div className="flex flex-row space-x-3 my-4">
						<span className="flex flex-col items-center justify-center w-10 h-10 rounded-full bg-gray-200 border-2 border-amber-500 text-lg font-semibold text-gray-400">{blog?.author?.username?.split(" ")[0].charAt(0)}</span>
						<span className="flex flex-col space-y-1">
							<p className="text-gray-700 font-semibold text-xs ">By {blog?.author?.username}</p>
							<p className="text-gray-700 font-semibold text-xs ">Published on {blog && formatDate(blog.createdAt)}</p>
						</span>
					</div>
					<div className="flex flex-col space-y-3 text-sm leading-8 font-normal text-gray-800" dangerouslySetInnerHTML={{ __html: blog.content }} />
				</div>
				<div className="col-span-3 flex flex-col p-4 h-full rounded-md">
					<p className="text-black font-bold p-3">TRENDING NOW</p>
					<div className="flex flex-col space-y-6">
						<span className="front-span">
							<p className="front-p">Court issues orders in rape allegations case against...</p>
							<p className="front-time">3 hrs ago</p>
						</span>
						<span className="front-span">
							<p className="front-p">Faith Odhiambo: Why I accepted Ruto’s appointment...</p>
							<p className="front-time">3 hrs ago</p>
						</span>
						<span className="front-span">
							<p className="front-p">How I lost over Ksh.150 million in Nairobi fake gold...</p>
							<p className="front-time">3 hrs ago</p>
						</span>
						<span className="front-span">
							<p className="front-p">Dialogue, avoid impeachment drama - Nairobi leaders urge...</p>
							<p className="front-time">3 hrs ago</p>
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BlogPost