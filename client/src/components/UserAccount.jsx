import React from 'react'
import { CircleUserRound, User } from 'lucide-react';
const UserAccount = ({ user, accessToken, handleLogout, navigate }) => {
  return (
    <div className="flex items-center gap-3">
      <button className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 hover:bg-white/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
        <User size={16} />
        <span className="text-sm">Account</span>
      </button>
      {!accessToken ? <CircleUserRound onClick={() => navigate("/auth/login")} className="nav-icon" /> : <span onClick={handleLogout} className="flex flex-col items-center justify-center text-sm cursor-pointer font-semibold w-10 h-10 rounded-full ring-2 ring-white/20">
        <p className="text-sm text-white">{user?.username.split(" ").length === 2 ? user?.username?.split(" ")[0].charAt(0) : user?.username?.charAt(0)}{user?.username.split(" ").length === 2 ? user?.username?.split(" ")[1].charAt(0) : ""}</p>
         </span>}
    </div>
  )
}

export default UserAccount