import React from 'react'
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col w-full h-screen items-center justify-center">
			<p className="text-center font-bold text-green-700">Login Page</p>
			<div className="flex flex-col items-center justify-center prose">
				<h1 className="text-lg font-semibold text-green-400">All your blogs will appear here</h1>
				<p className="text-sm font-normal">This is styled with Tailwind Typography.</p>
				<input type="text" className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-3 outline-none hover:outline-none text-sm text-gray-500 border border-gray-400 h-10" placeholder="Your name" />
			</div>
			<button
				onClick={() => navigate('/auth/register')}
				className="flex items-center group cursor-pointer hover:bg-white hover:border-green-600 border-2 border-white hover:text-green-600 space-x-3 text-sm font-semibold text-white bg-green-600 w-fit rounded-full px-6 py-3 my-4 transition-all delay-300"
				>
					Register <MdOutlineChevronRight className="h-5 w-5 text-gray-50 group-hover:text-green-600 transition-all delay-300" /> 
			</button>
		</div>
	)
}

export default Login