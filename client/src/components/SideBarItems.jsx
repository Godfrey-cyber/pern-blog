import React from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"

const SidebarItems = ({ Icon, ArrowD, title, route }) => {
	const navigate = useNavigate()
	const location = useLocation()
	const path = location.pathname?.split("/")[3]
	const array = route?.split("/")[2]
	// console.log(array)
	// console.log(path, route?.split("/")[2])
	// console.log(path == array)
    return (
    	<Link to={`/${route}`} className={`sidebar-items group ${path == array ? 'bg-gray-100' : ''}`}>
			<Icon className={`text-gray-800 group-hover:text-green-500 h-5 w-5 ${path == array ? 'text-green-500' : ''}`} />
			<span className="flex items-center justify-between w-full">
				<p className={`text-sm font-semibold group-hover:text-gray-600 ${path == array ? '' : 'text-gray-100'}`}>{title}</p>
				<ArrowD className={`text-gray-800 group-hover:text-green-500 h-5 w-5 ${path == array ? 'text-green-500' : ''}`} />
			</span>
		</Link>
        
    )
}

export default SidebarItems