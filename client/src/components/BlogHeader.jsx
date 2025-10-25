// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, Home, FileText, Tag, User, Settings, Search } from "lucide-react";
// import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
// import { RxHamburgerMenu } from "react-icons/rx";
// import { IoMdSearch } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6"


// const BlogHeader = () => {
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();
// 	const [open, setOpen] = useState(false);
// 	const { user, accessToken, loading } = useSelector(state => state.auth);
// 	const handleLogout = () => {
// 	    dispatch(logoutUser());
// 	    navigate("/")
// 	};

// 	return (
// 		<nav className="navbar">
// 			<Link to="/">
// 				<span className="flex flex-col items-center">
// 					<img src="https://www.shutterstock.com/image-vector/blog-writing-line-icon-web-600nw-2366232875.jpg" alt="" className="h-18 w-18 object-cover" />
// 				</span>
// 			</Link>
// 			<div className="hidden md:flex space-x-3 items-center">
// 				<p className="nav-list">MARKET</p>
// 				<p className="nav-list">LEADERS</p>
// 				<p className="nav-list">CAREERS</p>
// 				<p className="nav-list">LIFESTYLE</p>
// 			</div>
// 			<div className="flex space-x-5 items-center">
// 				<IoMdSearch className="nav-icon" /> 
// 				<RxHamburgerMenu className="nav-icon" /> 
// 				{!accessToken ? <FaRegCircleUser onClick={() => navigate("/auth/login")} className="nav-icon" /> : <span onClick={handleLogout} className="flex flex-col items-center h-8 w-8 justify-center text-sm cursor-pointer font-semibold bg-gray-200 border-2 border-amber-500 rounded-full">
// 					<p className="text-sm text-gray-400">{user?.username?.split(" ")[0].charAt(0)}</p>
// 				</span>}
// 			</div>
// 		</nav>
// 	)
// }

// export default BlogHeader

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../redux/authThunk.js"
import { motion, AnimatePresence } from "framer-motion";
import { fetchCategories } from "../redux/blogThunk.js"
import { Menu, X, Home, FileText, Tag, User, Settings, Search } from "lucide-react";

// HeaderWithBlobSidebar.jsx
// Default export: React component that renders a header with a blob toggle button
// and a well-animated sidebar. Uses TailwindCSS + Framer Motion + lucide-react icons.

const BlogHeader = ({ title = "My Blog" }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [cat, setCat] = useState([])
	const [activeSection, setActiveSection] = useState("home");
	const [open, setOpen] = useState(false);
	const { user, accessToken, loading } = useSelector(state => state.auth);

	const links = [
	    { name: "MARKET", id: "market" },
	    { name: "LEADERS", id: "leaders" },
	    { name: "CAREERS", id: "career" },
	    { name: "LIFESTYLE", id: "lifestyle" },
	    { name: "CONTACT", id: "contact" },
	];

	useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => document.getElementById(link.id));
      const current = sections.find(
        (section) =>
          section &&
          window.scrollY >= section.offsetTop - 100 &&
          window.scrollY < section.offsetTop + section.offsetHeight
      );
      if (current) setActiveSection(current.id);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

	const handleLogout = () => {
	    dispatch(logoutUser());
	    navigate("/")
	};

	const { categories } = useSelector(state => state.category);
	const sidebarVariants = {
	    hidden: { x: -300, opacity: 0 },
	    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 250, damping: 30 } },
	    exit: { x: -300, opacity: 0, transition: { ease: "easeInOut" } },
	};

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  const blobButtonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
  };

  const menuItem = (icon, label, desc, slug, id) => (
  	<>
  	{categories?.map(cat => (
  		<Link to={`/category/${cat?.slug}/${cat?.id}`} key={cat?.slug || cat?.id}
        className="group flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-white/6 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
      >
	        <span className="w-6 h-6 flex items-center justify-center text-indigo-300 group-hover:text-white">
	          {icon}
	        </span>
	        <div className="flex-1">
	          <div className="text-sm font-medium leading-tight text-white">{cat?.title}</div>
	          {desc && <div className="text-xs text-white/60">{cat?.slug}</div>}
	        </div>
	        <span className="text-white/40">&rarr;</span>
	    </Link>
  	))}
  	</>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-40">
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Left: blob toggle + title */}
            <div className="flex items-center gap-4">
              <motion.button
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((s) => !s)}
                className="relative flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white bg-white/10 backdrop-blur"
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={blobButtonVariants}
              >
                {/* Blob visual */}
                <motion.span
                  className="absolute inset-0 rounded-full"
                  layout
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 20%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.03), transparent 30%)',
                  }}
                />
                <motion.span className="relative text-white">
                  {open ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </motion.button>

              <div className="flex flex-col">
                <h1 className="text-lg font-semibold leading-tight truncate">{title}</h1>
                <p className="text-xs text-white/70">Insightful stories & code</p>
              </div>
            </div>


                {/*<nav className="hidden md:flex gap-8">
		          {links.map((link) => (
		            <a
		              key={link.id}
		              href={`#${link.id}`}
		              onClick={() => setActiveSection(link.id)}
		              className={`font-medium transition-colors duration-300 ${
		                activeSection === link.id
		                  ? "text-blue-600 border-b-2 border-blue-600"
		                  : "text-gray-700 hover:text-blue-500"
		              }`}
		            >
		              {link.name}
		            </a>
		          ))}
        		</nav>*/}

            {/* Right: search and profile */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-white/6 rounded-lg px-3 py-1 backdrop-blur">
                <Search size={16} className="text-white/70" />
                <input
                  type="search"
                  placeholder="Search posts..."
                  className="bg-transparent placeholder-white/60 text-white text-sm outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <button className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 hover:bg-white/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                  <User size={16} />
                  <span className="text-sm">Account</span>
                </button>
                {!accessToken ? <FaRegCircleUser onClick={() => navigate("/auth/login")} className="nav-icon" /> : <span onClick={handleLogout} className="flex flex-col items-center justify-center text-sm cursor-pointer font-semibold w-10 h-10 rounded-full ring-2 ring-white/20">
 					<p className="text-sm text-gray-400">{user?.username?.split(" ")[0].charAt(0)}</p>
		 				</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar + Backdrop */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
              onClick={() => setOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.aside
              className="fixed left-0 top-0 bottom-0 w-80 max-w-full bg-gradient-to-b from-gray-900/90 to-gray-900/75 text-white shadow-2xl p-6 overflow-auto"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sidebarVariants}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm text-white/70">Welcome back</div>
                  <div className="text-lg font-semibold">{user?.username?.split(" ")[0] || user?.username}</div>
                </div>
                <button
                  className="p-2 rounded-md bg-white/6 hover:bg-white/8"
                  onClick={() => setOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <nav aria-label="Main navigation" className="mb-6">
                <ul className="flex flex-col gap-2">
                  	{menuItem(<Home size={16} />, "Home", "Latest posts")}
                </ul>
              </nav>

              <div className="mt-6">
                <h3 className="text-xs text-white/60 uppercase mb-3">Recently viewed</h3>
                <ul className="flex flex-col gap-2">
                  <li className="px-3 py-2 bg-white/2 rounded-lg">How to ship faster with CI/CD</li>
                  <li className="px-3 py-2 bg-white/2 rounded-lg">Redis caching patterns</li>
                </ul>
              </div>

              <div className="mt-8 border-t border-white/6 pt-6 text-sm text-white/70">
                <div className="mb-2">Theme</div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded bg-white/6">Logout</button>
                  <button className="px-3 py-1 rounded bg-white/6">Login</button>
                </div>
              </div>

              <footer className="mt-8 text-xs text-white/50">
                © {new Date().getFullYear()} {title} — Built with ❤️ by Godfrey.
              </footer>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
export default BlogHeader