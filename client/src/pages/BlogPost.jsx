import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion";
import TimeAgo from "react-timeago";
import { ToastContainer, toast } from 'react-toastify';
// files
// import { fetchBlog } from "../services/blogService.js"
import { formatDate, axiosInstance, trimString } from "../utilities/utiles.js"
import BlogHeader from "../components/BlogHeader.jsx"
import Comments from "../components/Comments.jsx"
import Footer from "../components/Footer.jsx"
import UsersCommentList from "../components/UsersCommentList.jsx"
import { fetchBlogById } from "../redux/blogThunk.js"
import { useDispatch, useSelector } from "react-redux"

const BlogPost = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { blog, isLoading, isError } = useSelector(state => state.blog);
	const { user } = useSelector(state => state.auth);
	const { blogs, isFetching, error } = useSelector(state => state.blogs);
	const { accessToken } = useSelector(state => state.auth);
	const { id, slug } = useParams();

	useEffect(() => {
	    if (!id) return;
	    dispatch(fetchBlogById(id))
	    window.scrollTo(0, 0)
	}, [id, dispatch]);
	console.log(blog)
	// if (isLoading) return <p>Loading blog...</p>;
	// if (!blog) return <p className="text-sm font-bold-red-gray-500 w-screen h-screen flex items-center justify-center">Loading</p>
	return (
		<div className="flex flex-col w-full h-screen w-full">
		 	<BlogHeader />
			<div className="grid grid-cols-12 gap-4 lg:gap-8 px-5 md:px-10 lg:px-20 mt-20">
				<div className="col-span-12 md:col-span-8 flex flex-col space-y-4">
					<span className="flex flex-col space-y-1">
						{!blog || isLoading ? (
							<div className="animate-pulse">
								<div className="h-6 w-1/3 rounded-md skeleton mb-3"></div>
							</div>
							) : (
							<Link to={`/category/${blog?.category?.slug}/${blog?.category?.id}`}>
								<p className="text-xs font-semibold text-green-700 hover:text-green-500">{blog?.category?.title}</p>
							</Link>
						)}

						{!blog || isLoading ? (
							<div className="animate-pulse">
								<div className="h-10 w-1/2 rounded-md skeleton mb-3"></div>
							</div>
							) : (
							<motion.h2
					            key={blog?.id}
					            className="text-3xl font-bold text-black hover:text-amber-500"
					            initial={{ opacity: 0, y: 15 }}
					            animate={{ opacity: 1, y: 0 }}
					            transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
					          >{blog?.title}
					        </motion.h2>
						)}						
					</span>
					{!blog || isLoading ? (
						<span className="h-80 min-h-[400px] max-h-[450px] skeleton mb-3"></span>
						) : (
						<Link to={`/blog/${blog?.slug}/${blog?.id}`}>
							{blog && <img src={blog?.image} alt="" className="h-80 min-h-[400px] max-h-[400px] object-cover" />}
						</Link>
					)}
					
					{/* ----- author details ----- */}
					<div className="flex flex-row space-x-3 my-4">
					  {isLoading ? (
					    <>
					      <div className="w-10 h-10 rounded-full skeleton"></div>
					      <div className="flex flex-col space-y-2">
					        <div className="h-3 w-24 rounded skeleton"></div>
					        <div className="h-3 w-32 rounded skeleton"></div>
					      </div>
					    </>
					  ) : (
					    <>
					      <span className="flex flex-col items-center justify-center w-10 h-10 rounded-full bg-gray-200 border-2 border-amber-500 text-lg font-semibold text-gray-400">
					        {blog?.author?.username?.split(" ")[0].charAt(0)}
					      </span>
					      <span className="flex flex-col space-y-1">
					        <p className="text-gray-700 font-semibold text-xs">
					          By {blog?.author?.username}
					        </p>
					        <p className="text-gray-700 font-semibold text-xs">
					          Published on {blog && formatDate(blog?.createdAt)}
					        </p>
					      </span>
					    </>
					  )}
					</div>
					{/* ----- blog ----- */}
					<div className="flex flex-col space-y-3 text-sm leading-8 font-normal text-gray-800" dangerouslySetInnerHTML={{ __html: blog?.content }} />
				</div>
				<div className="hidden md:col-span-3 md:flex flex-col p-4 h-full rounded-md">
					<div className="col-span-3 flex flex-col p-4 h-full rounded-md">
						<p className="text-black font-bold p-3">TRENDING NOW</p>
						<div className="flex flex-col space-y-6">
							{isFetching ? (
						      // 🪄 Shimmer placeholder while loading
						      Array.from({ length: 4 }).map((_, i) => (
						        <div key={i} className="flex flex-col space-y-2 animate-pulse">
						          <div className="h-8 w-full skeleton rounded"></div>
						          <div className="h-6 w-3/4 skeleton rounded"></div>
						        </div>
						      ))
						    ) : (
						    blogs.slice(1, 5).map((blog, index) => (
						        <Link key={blog.id} to={`/blog/${blog.slug}/${blog.id}`}>
						          <span className="front-span">
						            <motion.p
						              className="front-p"
						              initial={{ opacity: 0, y: 10 }}
						              animate={{ opacity: 1, y: 0 }}
						              transition={{ delay: index * 0.1, duration: 0.4 }}
						            >
						              {trimString(blog.title, 60)}
						            </motion.p>
						            <motion.div
						              initial={{ opacity: 0 }}
						              animate={{ opacity: 1 }}
						              transition={{ delay: 0.3 + index * 0.1 }}
						            >
						              <TimeAgo
						                className="text-gray-500 text-xs font-semibold"
						                date={blog.createdAt}
						              />
						            </motion.div>
						          </span>
						        </Link>
						      ))
						    )}
						</div>
					</div>
				</div>
			</div>
			<Comments user={user} accessToken={accessToken}/>
			<UsersCommentList blog={blog} />			
			<Footer />			
		</div>
	)
}

export default BlogPost