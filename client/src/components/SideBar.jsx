// import React from 'react'
// import { CiSearch } from "react-icons/ci";
// import { FaStar, FaRegComment, FaClipboardCheck, FaGraduationCap, FaUserGraduate, FaRegUserCircle  } from "react-icons/fa";
// import { TiMessages } from "react-icons/ti";
// import { MdSpaceDashboard, MdOutlineBookmarkBorder, MdCastForEducation } from "react-icons/md";
// import { RiUserSettingsLine, RiLockPasswordFill } from "react-icons/ri";
// import { FaUserDoctor } from "react-icons/fa6";
// import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
// import { IoIosHeartEmpty, IoIosLogOut } from "react-icons/io";
// import { ImNewspaper } from "react-icons/im";
// import { LuCalendarArrowUp } from "react-icons/lu";
// import { useSelector, useDispatch } from 'react-redux';
// import { logoutUser } from '../redux/authThunk.js';
// import SideBarItems from "./SideBarItems.jsx"
// import { axiosInstance } from "../utilities/utiles.js"
// import { useNavigate } from 'react-router-dom';

// const SideBar = () => {
// 	const navigate = useNavigate();
// 	const { user } = useSelector(state => state.auth);
// 	const dispatch = useDispatch();
// 	return (
// 		// <div className="hidden lg:flex flex-col space-y-2 col-span-2 bg-green-600 h-screen">
// 		<div className="flex flex-col divide-y divide-gray-100 mt-12 py-3">
// 			<div className="flex flex-col flex-y-3 divide-gray-200">
// 	            <SideBarItems route="dashboard" title="My Dashboard" Icon={MdSpaceDashboard} />
// 	            <SideBarItems route="career-profile" title="Career Profile" Icon={FaUserGraduate} />
// 	            <SideBarItems route="user/skill-assessment" title="My Skills Assessments" Icon={FaGraduationCap} />
// 	            <SideBarItems route="user/order-history" title="My Order History" Icon={LuCalendarArrowUp} />
// 	            <SideBarItems route="user/saved-jobs" title="My Saved Jobs" Icon={MdOutlineBookmarkBorder} />
// 	            <SideBarItems route="user/courses" title="My Courses" Icon={MdCastForEducation} />
// 	            <SideBarItems route="user/post-a-job" title="Post A Job" Icon={ImNewspaper} />
// 	        </div>
// 	        {user && (<div className="flex items-center space-x-5 my-4">
// 	        	<FaRegUserCircle className="h-9 w-9 text-red-800 hover:text-amber-600 cursor-pointer " />
// 	        	<span className="flex flex-col space-y-2">
// 	        		<p className="text-sm font-semibold text-gray-800">{user.username}</p>
// 	        		<p className="text-xs font-normal text-gray-500">{user.email}</p>
// 	        	</span>
// 	        </div>)}
// 	        {user ? <button onClick={logoutUser} className="bg-red-800 rounded-md px-4 cursor-pointer py-3 text-white text-sm font-normal">Logout</button> : <button onClick={() => navigate("/account/login")} className=" cursor-pointer bg-red-800 rounded-md px-4 py-3 text-white text-sm font-normal">Login</button>}
// 		</div>
// 		// </div>
// 	)
// }

// export default SideBar