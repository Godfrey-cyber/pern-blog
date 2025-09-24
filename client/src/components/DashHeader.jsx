import React from 'react'
import { Link } from "react-router-dom"
import { CiSearch } from "react-icons/ci";

const DashHeader = () => {
	return (
		<div className="flex flex-row items-center justify-between h-20 w-full bg-white border-b border-gray-200 p-5 md:px-10 lg:px-15 top-0 fixed">
			<Link to="/">
				<span className="flex flex-col items-center">
					<img src="https://www.shutterstock.com/image-vector/blog-writing-line-icon-web-600nw-2366232875.jpg" alt="" className="h-18 w-18 object-cover" />
				</span>
			</Link>
			<div className="hidden md:flex items-center space-x-3">
				<CiSearch className="h-7 w-7 lg:h-7 lg:w-7 cursor-pointer text-gray-700 hover:text-green-600" />
				<p className="text-xs font-bold text-gray-700 cursor-pointer">Documents</p>
				<p className="text-xs font-bold text-gray-700 cursor-pointer">Report</p>
			</div>
		</div>
	)
}

export default DashHeader