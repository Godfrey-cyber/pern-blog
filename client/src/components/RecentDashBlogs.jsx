import React from 'react'
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const RecentDashBlogs = () => {
	return (
		<div className="flex flex-col mx-2 lg:mx-6 h-full">
			<div className="grid grid-cols-12 gap-3 lg:gap-4 my-2 lg:my-4">
				<div className="col-span-12 lg:col-span-6 rounded-md flex flex-col space-y-4 shadow-2xl shadow-gray-300 h-52 w-full border border-gray-200 p-4">
					<p className="text-xl lg:text-lg text-black font-bold">Hi, Godfrey 👋,</p>
					<p className="text-lg lg:text-sm text-gray-400 font-semibold">There are the recent blogs.</p>
				</div>
				<div className="col-span-12 lg:col-span-6 rounded-md flex flex-col space-y-4 shadow-2xl shadow-gray-300 h-52 w-full border border-gray-200 p-4">
					<p className="text-xl lg:text-lg text-black font-bold">Hi, Godfrey 👋,</p>
					<p className="text-lg lg:text-sm text-gray-400 font-semibold">There are current users</p>
				</div>
			</div>
			<div className="grid grid-cols-12 gap-3 lg:gap-4 my-2 lg:my-4">
				<div className="col-span-12 lg:col-span-8 rounded-md flex flex-col space-y-4 shadow-2xl shadow-gray-300 h-52 w-full border border-gray-200 p-4">
					<p className="text-xl lg:text-lg text-black font-bold">Hi, Godfrey 👋,</p>
					<p className="text-lg lg:text-sm text-gray-400 font-semibold">Recent comments</p>
				</div>
				<div className="col-span-12 lg:col-span-4 rounded-md flex flex-col space-y-4 shadow-2xl shadow-gray-300 h-52 w-full border border-gray-200 p-4">
					<p className="text-xl lg:text-lg text-black font-bold">Hi, Godfrey 👋,</p>
					<p className="text-lg lg:text-sm text-gray-400 font-semibold">Trending blogs</p>
				</div>
			</div>
			<div className="grid grid-cols-12 gap-3 lg:gap-4 my-2 lg:my-4">
				<div className="col-span-12 lg:col-span-3 rounded-md flex flex-col space-y-4 shadow-2xl shadow-gray-300 h-52 w-full border border-gray-200 p-4">
					<p className="text-xl lg:text-lg text-black font-bold">Hi, Godfrey 👋,</p>
					<p className="text-lg lg:text-sm text-gray-400 font-semibold">Trending blogs</p>
				</div>
				<div className="col-span-12 lg:col-span-3 rounded-md flex flex-col space-y-4 shadow-2xl shadow-gray-300 h-52 w-full border border-gray-200 p-4">
					<p className="text-xl lg:text-lg text-black font-bold">Hi, Godfrey 👋,</p>
					<p className="text-lg lg:text-sm text-gray-400 font-semibold">Trending blogs</p>
				</div>
				<div className="col-span-12 lg:col-span-6 rounded-md flex flex-col space-y-4 shadow-2xl shadow-gray-300 h-52 w-full border border-gray-200 p-4">
					<p className="text-xl lg:text-lg text-black font-bold">Hi, Godfrey 👋,</p>
					<p className="text-lg lg:text-sm text-gray-400 font-semibold">Recent comments</p>
				</div>
			</div>
		</div>
	)
}

export default RecentDashBlogs