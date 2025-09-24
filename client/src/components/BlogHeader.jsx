import React from 'react'
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdSearch } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6"
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../redux/authThunk.js"

const BlogHeader = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user, accessToken, loading } = useSelector(state => state.auth);
	const handleLogout = () => {
	    dispatch(logoutUser());
	    navigate("/")
	};
	return (
		<nav className="navbar">
			<Link to="/">
				<span className="flex flex-col items-center">
					<img src="https://www.shutterstock.com/image-vector/blog-writing-line-icon-web-600nw-2366232875.jpg" alt="" className="h-18 w-18 object-cover" />
				</span>
			</Link>
			<div className="hidden md:flex space-x-3 items-center">
				<p className="nav-list">MARKET</p>
				<p className="nav-list">LEADERS</p>
				<p className="nav-list">CAREERS</p>
				<p className="nav-list">LIFESTYLE</p>
			</div>
			<div className="flex space-x-5 items-center">
				<IoMdSearch className="nav-icon" /> 
				<RxHamburgerMenu className="nav-icon" /> 
				{!accessToken ? <FaRegCircleUser onClick={() => navigate("/auth/login")} className="nav-icon" /> : <span onClick={handleLogout} className="flex flex-col items-center h-8 w-8 justify-center text-sm cursor-pointer font-semibold bg-gray-200 border-2 border-amber-500 rounded-full">
					<p className="text-sm text-gray-400">{user?.username?.split(" ")[0].charAt(0)}</p>
				</span>}
			</div>
		</nav>
	)
}

export default BlogHeader