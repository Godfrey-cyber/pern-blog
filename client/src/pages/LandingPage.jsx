import React, { useEffect, useState } from 'react';
// packages
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
// files
import { axiosInstance } from '../utilities/utiles.js';
import LoadingBlog from "../components/LoadingBlog.jsx"
import BlogHeader from "../components/BlogHeader.jsx"
import FrontPage from "../components/FrontPage.jsx"
import Feed from "../components/Feed.jsx"
import { fetchBlogs } from "../services/blogService.js"

const LandingPage = () => {
	const [blogs, setBlogs] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const controller = new AbortController();
		const listBlogs = async () => {
			try {
				const data = await fetchBlogs(controller.signal);
		        if (data) {
		          setBlogs(data);
		          console.log("Fetched blogs:", data);
		        }
			} catch (error) {
				console.log("User not authenticated", error);
			}
		};
		listBlogs();
		return () => controller.abort();
	}, []);
	return (
		<div className="flex flex-col w-full h-screen w-full">
			<BlogHeader />
			<FrontPage />
			<Feed />
			{/*<div className="flex flex-col w-full items-center justify-center px-5 md:px-10 lg:px-20">
				<p className="text-center font-bold text-green-700">LandingPage Page</p>
				<div className="flex flex-col items-center justify-center prose">
					<h1 className="text-lg font-semibold text-green-400">All your blogs will appear here</h1>
					<p className="text-sm font-normal">This is styled with Tailwind Typography.</p>
				</div>
				<button
					onClick={() => navigate('/blogs/username/dashboard')}
					className="flex items-center group cursor-pointer hover:bg-white hover:border-green-600 border-2 border-white hover:text-green-600 space-x-3 text-sm font-semibold text-white bg-green-600 w-fit rounded-full px-6 py-3 my-4 transition-all delay-300"
					>
						Dashboard <MdOutlineChevronRight className="h-5 w-5 text-gray-50 group-hover:text-green-600 transition-all delay-300" /> 
				</button>
				{!blogs ? <LoadingBlog /> : blogs?.slice(0, 4).map(data => (
					<div
						key={data.id}
						onClick={() =>
							navigate(
								`/blog/${data.id}/${data.slug}`
							)
						}
						className="px-2 group flex flex-col space-y-4 h-96 justify-center rounded-lg rounded-lg border border-gray-300 cursor-pointer"
					>
						<p className="text-2xl font-bold text-green-600">
							{data.title}
						</p>
						<p className="text-xs font-bold text-gray-700">
							{data.author.username}
						</p>
						<p className="text-sm font-semibold text-gray-600">
							{data.description}
						</p>
						<p className="text-sm font-normal text-black">
							{data.content}
						</p>
					</div>
				))}
			</div>*/}
		</div>
	)
}

export default LandingPage
// http://localhost:5500/