import React from 'react'
import { useSelector } from "react-redux"
// import { selectUser } from "../Redux/slices/userSlice.js"

const DashSalutations = () => {
	// const user = useSelector(selectUser)
	const { user, loading, error, accessToken } = useSelector(state => state.auth);
	return (
		<div className="flex flex-col my-2 space-y-1 px-6 mt-24">
			<p className="text-2xl lg:text-lg text-black font-bold">Hi, {user?.username.split(" ")[0]} 👋,</p>
			<p className="text-lg lg:text-sm text-gray-400 font-semibold">There are no blogs so far</p>
		</div>
	)
}

export default DashSalutations