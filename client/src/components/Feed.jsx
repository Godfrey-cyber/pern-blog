import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { fetchBlogs } from "../services/blogService.js"
import { formatDate } from "../utilities/utiles.js"
import { fetchBlogs } from "../redux/blogThunk.js"
import TimeAgo from "react-timeago";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux"

const Feed = () => {
	// const [blogs, setBlogs] = useState([]);
	const { blogs, loading, error, isFetching } = useSelector(state => state.blogs);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
	    const controller = new AbortController();
	    dispatch(fetchBlogs())
	    return () => controller.abort();
	  }, []);
	// if (loading) return <p>Loading blogs...</p>;
	return (
		<>
		  {isFetching
		    ? 
		      [...Array(6)].map((_, i) => (
		        <div key={i} className="feed animate-pulse">
		          <div className="grid grid-cols-12 gap-2 md:gap-4 rounded-md">
		            <div className="col-span-12 md:col-span-6 h-52 md:h-64 skeleton rounded-md"></div>
		            <div className="col-span-12 md:col-span-6 flex flex-col space-y-3">
		              <div className="h-4 w-24 skeleton rounded"></div>
		              <div className="h-6 w-3/4 skeleton rounded"></div>
		              <div className="h-4 w-1/2 skeleton rounded"></div>
		              <div className="h-3 w-1/3 skeleton rounded"></div>
		            </div>
		          </div>
		        </div>
		      ))
		    : 
		      blogs?.slice(14, 20).map(({ id, slug, createdAt, title, description, image, category }) => (
		        <motion.div
		          key={id || slug}
		          initial={{ opacity: 0, filter: "blur(6px)" }}
		          animate={{ opacity: 1, filter: "blur(0px)" }}
		          transition={{ duration: 0.5 }}
		          className="feed"
		        >
		          <div className="grid grid-cols-12 gap-2 md:gap-4 transform rotate-180 md:rotate-0 rounded-md">
		            <Link
		              to={`/blog/${slug}/${id}`}
		              className="col-span-12 md:col-span-6 transform rotate-180 md:rotate-0 h-52 md:h-64"
		            >
		              <img src={image} alt="" className="flex h-full w-full object-cover rounded-md" />
		            </Link>

		            <div className="col-span-12 md:col-span-6 transform rotate-180 md:rotate-0 flex flex-col space-y-2 md:space-y-4">
		              <span className="flex items-center flex-row space-x-3">
		                <Link to={`/category/${category?.slug}/${category?.id}`}>
		                  <p className="text-sm font-semibold text-amber-500 hover:underline">
		                    {category?.title}
		                  </p>
		                </Link>
		                <TimeAgo
		                  className="text-gray-500 text-xs font-semibold"
		                  date={createdAt}
		                />
		              </span>

		              <Link to={`/blog/${slug}/${id}`}>
		                <span className="flex flex-col space-y-1 md:space-y-3">
		                  <p className="text-lg md:text-xl lg:text-2xl font-bold text-black leading-5 md:leading-8">
		                    {title}
		                  </p>
		                  <p className="hidden md:flex text-sm font-normal text-black">{description}</p>
		                </span>
		              </Link>
		            </div>
		          </div>
		        </motion.div>
		      ))}
		</>
	)
}

export default Feed