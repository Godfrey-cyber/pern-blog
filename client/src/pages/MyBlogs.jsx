import React from 'react'
import DashSalutations from "../components/DashSalutations.jsx"
import RecentDashBlogs from "../components/RecentDashBlogs.jsx"
import DashSideBar from "../components/DashSideBar.jsx"
import DashHeader from "../components/DashHeader.jsx"
import DashBlogs from "../components/DashBlogs.jsx"

const MyBlogs = () => {
	return (
		<div className="grid grid-cols-12 w-screen relative max-h-screen">
			<DashSideBar />
			<div className="flex flex-col col-span-12 lg:col-span-10 h-screen w-full overflow-y-scroll">
				<DashHeader />
				<DashSalutations />
				<DashBlogs />
			</div>
		</div>
	)
}

export default MyBlogs