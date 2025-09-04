import React from 'react'
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const EditBlog = () => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col w-full h-screen items-center justify-center">
			<p className="text-center font-bold text-green-700">EditBlog Page</p>
			<div className="flex flex-col items-center justify-center prose">
				<h1 className="text-lg font-semibold text-green-400">All your blogs will appear here</h1>
				<p className="text-sm font-normal">This is styled with Tailwind Typography.</p>
			</div>
			<button
				onClick={() => navigate('/auth/forgot-password')}
				className="flex items-center group cursor-pointer hover:bg-white hover:border-green-600 border-2 border-white hover:text-green-600 space-x-3 text-sm font-semibold text-white bg-green-600 w-fit rounded-full px-6 py-3 my-4 transition-all delay-300"
				>
					 <MdOutlineChevronLeft className="h-5 w-5 text-gray-50 group-hover:text-green-600 transition-all delay-300" /> Login
			</button>
		</div>
	)
}

export default EditBlog