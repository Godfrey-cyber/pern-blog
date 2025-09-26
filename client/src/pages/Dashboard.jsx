import React from 'react'
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdSearch } from "react-icons/io"
import { CiSearch } from "react-icons/ci";
import { useNavigate, Link } from 'react-router-dom';
// files
import DashSalutations from "../components/DashSalutations.jsx"
import RecentDashBlogs from "../components/RecentDashBlogs.jsx"
import DashSideBar from "../components/DashSideBar.jsx"
import DashHeader from "../components/DashHeader.jsx"
import { useSelector } from "react-redux"

const Dashboard = () => {
	const navigate = useNavigate();
	const { user, loading, error, accessToken } = useSelector(state => state.auth);
	return (
		<div className="grid grid-cols-12 w-screen relative max-h-screen">
			<DashSideBar />
			<div className="flex flex-col col-span-12 lg:col-span-10 h-screen w-full overflow-y-scroll">
			{/*header*/}
				<DashHeader />
				<DashSalutations />
				<RecentDashBlogs />
			</div>
		</div>
	)
}

export default Dashboard