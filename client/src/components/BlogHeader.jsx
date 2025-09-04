import React from 'react'
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const BlogHeader = () => {
	const navigate = useNavigate();
	return (
		<nav className="w-full h-20 px-5 md:px-10 lg:px-20 bg-gray-200 flex flex-row justify-between items-center">
			<span className="flex flex-col items-center justify-center">
				<img src="https://www.shutterstock.com/image-vector/blog-writing-line-icon-web-600nw-2366232875.jpg" alt="" className="h-12 w-12 object-cover" />
			</span>
			<div className="flex justify-between w-full">
				<p className="text-sm font-semibold text-red-400">Blog</p>
				<p className="text-sm font-semibold text-red-400">Blog</p>
			</div>
		</nav>
	)
}

export default BlogHeader