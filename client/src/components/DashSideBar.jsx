// import React from 'react'
// import { CiSearch } from "react-icons/ci";
// import { FaStar, FaRegComment, FaClipboardCheck,  } from "react-icons/fa";
// import { TiMessages } from "react-icons/ti";
// import { MdSpaceDashboard } from "react-icons/md";
// import { RiUserSettingsLine, RiLockPasswordFill } from "react-icons/ri";
// import { FaUserDoctor } from "react-icons/fa6";
// import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
// import { IoIosHeartEmpty, IoIosLogOut } from "react-icons/io";
// import { GiMedicines } from "react-icons/gi";
// import SideBarItems from "./SideBarItems.jsx"
// import { Link } from "react-router-dom"
// import { useSelector } from "react-redux"

// const SidebarDash = () => {
// 	const { user, loading, error, accessToken } = useSelector(state => state.auth);
// 	return (
// 		<div className="hidden lg:flex flex-col space-y-2 col-span-2 bg-green-600 h-full">
// 			<div className="border-b border-gray-300 flex flex-col">
// 				<Link to="/blogs/name/dashboard" className="flex items-center justify-center h-14">
// 					<p className="text-2xl font-bold text-white items-center cursor-pointer">MyBlog</p>
// 				</Link>
// 				<Link to="/blogs/name/dashboard" className="flex items-center justify-between px-4 py-2 bg-black rounded-lg mx-3 mb-4">
// 					<p className="text-sm font-bold text-white item-center cursor-pointer">Dashboard</p>
// 					<MdSpaceDashboard className="text-white font-semibold" />
// 				</Link>
// 			</div>
// 			{/*bar list*/}
// 			<div className="flex flex-col divide-y divide-gray-100 mt-12 py-3">
// 				<div className="flex flex-col  divide-gray-200">	
// 		            <SideBarItems route="blogs/name/dashboard" title="Dashboard" Icon={MdSpaceDashboard} ArrowD={MdSpaceDashboard}/>
// 		            <SideBarItems route="dashboard/blogs/blog-list" title="My Blogs" Icon={FaClipboardCheck} ArrowD={MdSpaceDashboard}/>
// 		            <SideBarItems route="dashboard/blogs/authors-list" title="Authors" Icon={FaUserDoctor} ArrowD={MdSpaceDashboard}/>
// 		            <SideBarItems route="dashboard/blogs/users-list" title="Users" Icon={GiMedicines} ArrowD={MdSpaceDashboard}/>
// 		            <SideBarItems route="dashboard/blogs/messages" title="Messages" Icon={TiMessages} ArrowD={MdSpaceDashboard}/>
// 		            <SideBarItems route="dashboard/blogs/profile-data" title="Profile Settings" Icon={RiUserSettingsLine} ArrowD={MdSpaceDashboard}/>
// 		            <SideBarItems route="dashboard/blogs/favourites" title="Favourites" Icon={IoIosHeartEmpty} ArrowD={MdSpaceDashboard}/>
// 		            <SideBarItems route="dashboard/blogs/forgot-password" title="Change Password" Icon={RiLockPasswordFill} ArrowD={MdSpaceDashboard}/>
// 		            <SideBarItems title="Log Out" Icon={IoIosLogOut} ArrowD={MdSpaceDashboard}/>
// 		        </div>
// 			</div>
// 		</div>
// 	)
// }

// export default SidebarDash

