import React from 'react'
import { useSelector } from "react-redux"
import { formatDate, trimString } from "../utilities/utiles.js"
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom"

const FrontPage = () => {
	const { blogs } = useSelector(state => state.blogs)
	console.log(blogs)
	return (
		<div className="front-1">
			<div className="front-2">
				<div className="felx flex-col space-y-4">
					<div className="grid grid-cols-12 gap-4 "> {/*  bg-red-800  */}
						<div className="col-span-12 md:col-span-9 flex flex-col space-y-4">
							<span className="flex flex-col space-y-1">
							<Link to={`/category/${blogs[0]?.category?.slug}/${blogs[0]?.category?.id}`}>
								<p className="text-sm font-semibold text-green-700 hover:text-green-500">{blogs[0]?.category?.title}</p>
							</Link>
								<p className="text-3xl font-bold text-black hover:text-amber-500">{blogs[0]?.title}.</p>
							</span>
							<Link to={`/blog/${blogs[0]?.slug}/${blogs[0]?.id}`}>
								<img src={blogs[0]?.image} alt="" className="h-80 min-h-[400px] max-h-[450px] object-cover" />
							</Link>
						</div>
						<div className="hidden col-span-3 md:flex flex-col p-4 h-full rounded-md">
							<p className="text-black font-bold p-3">TRENDING NOW</p>
							<div className="flex flex-col space-y-6">
								{blogs.slice(1, 5).map(blog => (
									<Link key={blog.id} to={`/blog/${blog.slug}/${blog.id}`}>
										<span className="front-span">
											<p className="front-p">{trimString(blog.title, 60)}</p>
											{/*<p className="front-time">*/}
												<TimeAgo className="text-gray-500 text-xs font-semibold" date={blog.createdAt} 
												formatter={(value, unit, suffix) => `${value} ${unit}${value > 1 ? "s" : ""} ${suffix}`}
												/>
											{/*</p>*/}
										</span>
									</Link>
								))}
							</div>
						</div>
					</div>
					<div className="flex flex-row w-full h-56 md:h-64 rounded-md overflow-x-scroll space-x-4 my-6 lg:my-8">
						{blogs.slice(6, 9).map(blog => (
							<Link key={blog.id} to={`/blog/${blog.slug}/${blog.id}`}>
								<span className="flex flex-col space-y-2 w-52 md:w-72 h-full cursor-pointer">
									<img src={blog.image} alt="" className="h-36 w-52 w-full object-cover" />
									<p className="front-p">{trimString(blog.title, 70)}</p>
								</span>
							</Link>
						))}
					</div>
				</div>
			</div>
			<div className="hidden col-span-3 md:flex flex-col items-center justify-center space-y-3 min-h-72 ">
				<div className="flex flex-col items-center justify-center h-full border border-gray-300 w-full">Adds</div>
				<div className="flex flex-col items-center justify-center space-y-4">
					<p className="text-black font-bold p-3">ORIGINAL</p>
					<div className="flex flex-col space-y-6">
						{blogs.slice(11, 13).map(blog => (
							<Link key={blog.id} to={`/blog/${blog.slug}/${blog.id}`}>
								<span className="front-span">
									<p className="front-p">{trimString(blog.title, 60)}</p>
									<p className="front-time text-xs">
										<TimeAgo className="text-gray-500 text-xs font-semibold" date={blog.createdAt} />
									</p>
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
// https://assets.citizen.digital/wp-content/uploads/2021/10/4003/conversions/knife-pinned.jpg