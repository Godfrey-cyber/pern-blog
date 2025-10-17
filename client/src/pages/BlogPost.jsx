import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect } from "react"
import axios from "axios"
import TimeAgo from "react-timeago";
import { ToastContainer, toast } from 'react-toastify';
// files
// import { fetchBlog } from "../services/blogService.js"
import { formatDate, axiosInstance, trimString } from "../utilities/utiles.js"
import BlogHeader from "../components/BlogHeader.jsx"
import Comments from "../components/Comments.jsx"
import { fetchBlogById, commentsByBlog } from "../redux/blogThunk.js"
import { useDispatch, useSelector } from "react-redux"

const BlogPost = () => {
	const navigation = useNavigate()
	const dispatch = useDispatch()
	const { blog, blogs, loading, error } = useSelector(state => state.blog);
	const { accessToken } = useSelector(state => state.auth);
	const { comments } = useSelector(state => state.comment);
	const { id, slug } = useParams();

	useEffect(() => {
	    if (!id) return;
	    // const controller = new AbortController();
	    dispatch(fetchBlogById(id, toast))
	    // return () => controller.abort();
	  }, [id, dispatch]);

	useEffect(() => {
	    if (!id) return;
	    // const controller = new AbortController();
	    dispatch(commentsByBlog(id, toast, accessToken))
	    // return () => controller.abort();
	  }, [id, dispatch]);
	console.log(comments)
	if (loading) return <p>Loading blog...</p>;
	if (!blog) return <p className="text-sm font-bold-red-gray-500 w-screen h-screen flex items-center justify-center">Loading</p>
	return (
		<div className="flex flex-col w-full h-screen w-full">
		 	<BlogHeader />
			<div className="grid grid-cols-12 gap-4 lg:gap-8 px-5 md:px-10 lg:px-20 my-28">
				<div className="col-span-8 flex flex-col space-y-4">
				<span className="flex flex-col space-y-1">
					<p className="text-xs font-semibold text-green-700 hover:text-green-500">{blog?.category?.title}</p>
					<p className="text-3xl font-bold text-black hover:text-amber-500">{blog.title}.</p>
				</span>
					<img src={blog.image} alt="" className="h-80 min-h-[400px] max-h-[400px] object-cover" />
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
					<div className="col-span-3 flex flex-col p-4 h-full rounded-md">
						<p className="text-black font-bold p-3">TRENDING NOW</p>
						<div className="flex flex-col space-y-6">
							{blogs?.slice(0, 4).map(blog => (
								<Link key={blog.id} to={`/blog/${blog.slug}/${blog.id}`}>
									<span className="front-span">
										<p className="front-p">{trimString(blog.title, 60)}</p>
										<p className="front-time">
											<TimeAgo date={blog.createdAt} 
											formatter={(value, unit, suffix) => `${value} ${unit}${value > 1 ? "s" : ""} ${suffix}`}
											/>
										</p>
									</span>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
			<Comments id={id} />			
		</div>
	)
}

export default BlogPost