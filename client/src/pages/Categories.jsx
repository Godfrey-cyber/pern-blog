import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect } from "react"
import axios from "axios"
import TimeAgo from "react-timeago";
import { blogsByCategory } from "../redux/blogThunk.js"
import { formatDate, trimString } from "../utilities/utiles.js"
import { useDispatch, useSelector } from "react-redux"
import BlogHeader from "../components/BlogHeader.jsx"
import { motion } from "framer-motion";
import Footer from "../components/Footer.jsx"

const Categories = () => {
	const navigation = useNavigate()
	const dispatch = useDispatch()
	const { blogsByCat, loading, error, isFetching } = useSelector(state => state.blogsByCat);
	const { id, slug } = useParams();
	useEffect(() => {
	    if (!id) return;
	    dispatch(blogsByCategory(id))
	  }, [id, dispatch]);
	
	return (
		<div className="flex flex-col w-full">
		 	<BlogHeader />
		 	<div className="feed space-y-6 mt-28 w-full lg:w-4/5">


			 	{isFetching ? 
			 	(<div className="animate-pulse space-y-6 w-full lg:w-4/5">
				    {Array(6).fill().map((_, i) => (
				    <div key={i} className="grid grid-cols-12 gap-4 rounded-md w-full">
				        <div className="col-span-4 h-20 md:h-44 w-full skeleton rounded"></div>
				        <div className="col-span-8 flex flex-col space-y-4">
				          <div className="h-4 w-1/2 skeleton rounded"></div>
				          <div className="h-6 w-3/4 skeleton rounded"></div>
				          <div className="h-4 w-2/3 skeleton rounded"></div>
				          <div className="flex space-x-3">
				            <div className="h-3 w-16 skeleton rounded"></div>
				            <div className="h-3 w-24 skeleton rounded"></div>
				          </div>
				        </div>
				    </div>
					))}
				</div>
				) : (
					blogsByCat?.blogs?.slice(0, 6).map(({id, slug, title, description, image, createdAt, author, category}) => (
						<motion.div
				          key={id || slug}
				          initial={{ opacity: 0, filter: "blur(6px)" }}
				          animate={{ opacity: 1, filter: "blur(0px)" }}
				          transition={{ duration: 0.5 }}
				          className="grid grid-cols-12 gap-4 rounded-md"
				        >
				            <span className="col-span-4 h-20 md:h-44 w-full object-cover">
				            	<Link to={`/blog/${slug}/${id}`}
					              className=""
					            >
				              		<img src={image} alt="" className="flex h-full w-full object-cover rounded-md" />
				              </Link>
				            </span>
				            <div className="col-span-8 flex flex-col space-y-1 md:space-y-3 lg:space-y-4">
				                <span className="flex items-center flex-row space-x-3">
				                    <p className="text-sm font-semibold text-amber-500">{category?.title}</p>
				                </span>
				                <Link
					              	to={`/blog/${slug}/${id}`}
					          	>
					              <span className="flex flex-col space-y-3">
					                <p className="text-sm md:text-lg lg:text-2xl font-bold text-black">{title}</p>
					                <p className="hidden md:text-sm font-normal text-black">{description}</p>
					                <span className="flex items-center flex-row space-x-3">
					                  <p className="text-gray-500 text-xs font-semibold">{author?.username} — </p>
					                  <TimeAgo className="text-gray-500 text-xs font-semibold" date={createdAt} />
					                </span>
					              </span>
				              </Link>
				            </div>
				          {/*</div>*/}
				        </motion.div>
			      	))
			    )}
			</div>		
			<Footer />
		</div>
	)
}
export default Categories