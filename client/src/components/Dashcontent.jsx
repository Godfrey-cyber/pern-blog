import React from 'react'
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import DashSalutations from "./DashSalutations.jsx"

const Dashboard = () => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-row w-full h-screen flex flex-col">
			<div className="h-20 w-full bg-red-300 border-b border-green-300 p-2 ">
				<DashSalutations />
			</div>
		</div>
	)
}

export default Dashboard