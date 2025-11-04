import React, { useState } from "react";
import { useSelector } from "react-redux"
import WriteBlogModal from "./WriteBlogModal.jsx"

const DashSalutations = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { user, loading, error, accessToken } = useSelector(state => state.auth);
	const { blogs } = useSelector(state => state.blogs);
	return (
		<div className="flex flex-row items-center justify-between my-2 space-y-1 px-6 mt-24">
			<div className="">
				<p className="text-2xl lg:text-lg text-black font-bold">Hi, {user?.username.split(" ")[0]} 👋,</p>
				{blogs.length === 0 ? <p className="text-lg lg:text-sm text-gray-400 font-semibold">There are no blogs so far</p> : <p className="text-lg lg:text-sm text-gray-400 font-semibold">There are {blogs.length} blogs so far</p>}
			</div>
			{user?.role === "ADMIN" && <div className="">
				<button onClick={() => setIsModalOpen(true)} className="bg-green-600 px-4 py-3 text-sm rounded-md font-semibold text-white cursor-pointer">Add Blog</button>
			</div>}
			<WriteBlogModal
		        isOpen={isModalOpen}
		        onClose={() => setIsModalOpen(false)}
		    />
		</div>
	)
}

export default DashSalutations