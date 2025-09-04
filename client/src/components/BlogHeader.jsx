import React from 'react'
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { IoMdGlobe, IoMdSearch } from "react-icons/io";
import { useNavigate, Link } from 'react-router-dom';

const BlogHeader = () => {
	const navigate = useNavigate();
	return (
		<nav className="navbar">
		<Link to="/">
			<span className="flex flex-col items-center">
				<img src="https://www.shutterstock.com/image-vector/blog-writing-line-icon-web-600nw-2366232875.jpg" alt="" className="h-18 w-18 object-cover" />
			</span>
		</Link>
			<div className="flex space-x-3 items-center">
				<p className="nav-list">MARKET</p>
				<p className="nav-list">LEADERS</p>
				<p className="nav-list">CAREERS</p>
				<p className="nav-list">LIFESTYLE</p>
			</div>
			<div className="flex space-x-5 items-center">
				<IoMdSearch className="nav-icon" /> 
				<IoMdGlobe className="nav-icon" /> 
			</div>
		</nav>
	)
}

export default BlogHeader