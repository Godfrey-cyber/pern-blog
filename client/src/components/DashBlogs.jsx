import React from 'react'

const DashBlogs = () => {
	return (
		<div className="flex flex-col space-y-4 mx-2 lg:mx-6 h-full text-3xl text-green-700">
			<p className="text-green-700 font-semibold">My Blogs</p>
			<span className="h-8 w-full bg-gray-300 rounded-sm flex flex-row items-center justify-evenly ">
				<p className="text-xs font-semibold">Hello</p>
				<p className="text-xs font-semibold">Hello</p>
				<p className="text-xs font-semibold">Hello</p>
				<p className="text-xs font-semibold">Hello</p>
				<p className="text-xs font-semibold">Hello</p>
				<p className="text-xs font-semibold">Hello</p>
				<p className="text-xs font-semibold">Hello</p>
			</span>
			<span className="h-36 w-full bg-gray-200 rounded-sm flex flex-row items-center justify-between"></span>
		</div>
	)
}

export default DashBlogs