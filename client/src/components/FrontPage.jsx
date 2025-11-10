import React from 'react'
import { useSelector } from "react-redux"
import { formatDate, trimString } from "../utilities/utiles.js"
import { motion } from "framer-motion";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom"

const FrontPage = () => {
	const { blogs, isFetching } = useSelector(state => state.blogs)
	return (
		<div className="front-1">
			<div className="front-2">
				<div className="felx flex-col space-y-4">
					<div className="grid grid-cols-12 gap-4 "> {/*  bg-red-800  */}
						<div className="col-span-12 md:col-span-9 flex flex-col space-y-4">
							<span className="flex flex-col space-y-1">
							{isFetching ? (
								<div className="animate-pulse">
									<div className="h-6 w-1/3 skeleton mb-2"></div>
								</div>
								) : (
								<Link to={`/category/${blogs[0]?.category?.slug}/${blogs[0]?.category?.id}`}>
									<p className="text-sm font-semibold text-green-700 hover:text-green-500">{blogs[0]?.category?.title}</p>
								</Link>
							)}
								{isFetching ? (
								<div className="animate-pulse">
									<div className="h-10 w-4/5 skeleton mb-2"></div>
									<div className="h-10 w-3/4 skeleton mb-2"></div>
								</div>
								) : (
									<p className="text-3xl font-bold text-black hover:text-amber-500">{blogs[0]?.title}</p>
								)}
							</span>
							{isFetching ? (
								<span className="h-80 min-h-[400px] max-h-[450px] rounded-lg skeleton mb-2"></span>
								) : (
								<Link to={`/blog/${blogs[0]?.slug}/${blogs[0]?.id}`}>
									{blogs && <img src={blogs[0]?.image} alt="" className="h-80 min-h-[400px] max-h-[450px] object-cover" />}
								</Link>
							)}
						</div>
						<div className="hidden col-span-3 md:flex flex-col p-4 h-full rounded-md">
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
							// ✅ Actual blog list once loaded
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
						                formatter={(value, unit, suffix) =>
						                  `${value} ${unit}${value > 1 ? "s" : ""} ${suffix}`
						                }
						              />
						            </motion.div>
						          </span>
						        </Link>
						      ))
						    )}
							</div>
						</div>
					</div>
					<div className="flex flex-row w-full h-56 md:h-64 rounded-md overflow-x-scroll space-x-4 my-6 lg:my-5">

					{isFetching ? (
					    // 🪄 Loading shimmer placeholders
					    Array.from({ length: 3 }).map((_, i) => (
					      <div
					        key={i}
					        className="flex flex-col space-y-2 w-52 md:w-72 h-full animate-pulse"
					      >
					        <div className="h-36 w-full rounded-md skeleton"></div>
					        <div className="h-4 w-3/4 rounded skeleton"></div>
					      </div>
					    ))
					  ) : (
					  	// ✅ Real blog cards once loaded
					    blogs.slice(6, 9).map((blog, index) => (
					      <Link key={blog.id} to={`/blog/${blog.slug}/${blog.id}`}>
					        <motion.span
					          className="flex flex-col space-y-2 w-52 md:w-72 h-full cursor-pointer"
					          initial={{ opacity: 0, y: 10 }}
					          animate={{ opacity: 1, y: 0 }}
					          transition={{ delay: index * 0.1, duration: 0.3 }}
					        >
					          <img
					            src={blog.image}
					            alt={blog.title}
					            className="h-36 w-full object-cover rounded-md"
					          />
					          <p className="front-p">{trimString(blog.title, 70)}</p>
					        </motion.span>
					      </Link>
					    ))
					  )}
					</div>
				</div>
			</div>
			<div className="hidden col-span-3 md:flex flex-col items-center justify-center space-y-3 min-h-72 ">
				<div className="flex flex-col items-center justify-center h-full border border-gray-300 w-full">Adds</div>
				<div className="flex flex-col items-center justify-center space-y-4">
					<p className="text-black font-bold p-3">ORIGINAL</p>
					<div className="flex flex-col space-y-6">
						{isFetching
					    ? 
					      [...Array(2)].map((_, i) => (
					        <div key={i} className="flex flex-col space-y-2 animate-pulse">
					          <div className="h-4 w-3/4 rounded skeleton"></div>
					          <div className="h-3 w-1/2 rounded skeleton"></div>
					        </div>
					      ))
					    : 
					      blogs.slice(11, 13).map(blog => (
					        <Link key={blog.id} to={`/blog/${blog.slug}/${blog.id}`}>
					          <span className="front-span">
					            <p className="front-p transition duration-300 hover:text-amber-600">
					              {trimString(blog.title, 60)}
					            </p>
					              <TimeAgo
					              	className="text-gray-500 text-xs font-semibold"
					                date={blog.createdAt}
					              />
					          </span>
					        </Link>
					      ))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default FrontPage