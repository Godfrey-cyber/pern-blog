import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect } from "react"
import axios from "axios"
import TimeAgo from "react-timeago";
import { blogsByCategory } from "../redux/blogThunk.js"
import { formatDate, trimString } from "../utilities/utiles.js"
import { useDispatch, useSelector } from "react-redux"
import BlogHeader from "../components/BlogHeader.jsx"
import Footer from "../components/Footer.jsx"

const Categories = () => {
	const navigation = useNavigate()
	const dispatch = useDispatch()
	const { blogsByCat, loading, error } = useSelector(state => state.blogsByCat);
	const { id, slug } = useParams();
	useEffect(() => {
	    if (!id) return;
	    dispatch(blogsByCategory(id))
	  }, [id, dispatch]);
	if (loading) return <p className="text-2xl font-bold-red-gray-500 w-screen h-screen flex items-center justify-center">Loading blog...</p>;
	if (blogsByCat.length === 0) return <p className="text-2xl font-bold-red-gray-500 w-screen h-screen flex items-center justify-center">Loading</p>
	return (
		<div className="flex flex-col h-min-screen w-full">
		 	<BlogHeader />
		 	<div className="feed space-y-6 mt-30 w-full lg:w-4/5">
				{blogsByCat?.blogs?.slice(0, 6).map(({id, slug, title, description, image, createdAt, author, category}) => (
					<Link to={`/blog/${slug}/${id}`} key={id || slug}>
						<div className="grid grid-cols-12 gap-4 rounded-md">
							<img src={image} alt="" className="col-span-3 h-44 object-fit" />
							<div className="col-span-9 flex flex-col space-y-4">
								<span className="flex items-center flex-row space-x-3">
									<p className="text-sm font-semibold text-amber-500">{category?.title}</p>
								</span>
								<span className="flex flex-col space-y-3">
									<p className="text-2xl font-bold text-black">{title}</p>
									<p className="text-sm font-normal text-black">{description}</p>
									<span className="flex items-center flex-row space-x-3">
										<p className="text-gray-500 text-xs font-semibold">{author?.username} —</p>
										<TimeAgo className="text-gray-500 text-xs font-semibold" date={createdAt} />
									</span>
								</span>
							</div>
						</div>
					</Link>
				))}
			</div>
			<Footer />			
		</div>
	)
}
export default Categories