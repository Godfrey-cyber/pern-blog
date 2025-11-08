import { Home, FileText, Tag, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react"

const SidebarMenu = ({ categories, setOpen }) => {
  const menuItem = (icon, category) => (
    <Link 
      to={`/category/${category?.slug}/${category?.id}`} 
      key={category?.slug || category?.id}
      className="group flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-white/6 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
      onClick={() => setOpen(false)}
    >
      <span className="w-6 h-6 flex items-center justify-center text-indigo-300 group-hover:text-white">
        {icon}
      </span>
      <div className="flex-1">
        <div className="text-sm font-medium leading-tight text-white">
          {category?.title}
        </div>
        <div className="text-xs text-white/60">{category?.slug}</div>
      </div>
      <span className="text-white/40">&rarr;</span>
    </Link>
  );

  return (
    <nav aria-label="Main navigation" className="mb-6">
      <ul className="flex flex-col gap-2">
        {categories?.map(cat => menuItem(<Home size={16} />, cat))}
      </ul>
    </nav>
  );
};

export default SidebarMenu
