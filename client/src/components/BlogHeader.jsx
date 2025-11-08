import { FaRegCircleUser } from "react-icons/fa6"
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../redux/authThunk.js"
import { motion, AnimatePresence } from "framer-motion";
import { fetchCategories } from "../redux/blogThunk.js"
import SearchBar from "./SearchBar.jsx"
import UserAccount from "./UserAccount.jsx"
import LeftBlob from "./LeftBlob.jsx"
import SidebarMenu from "./SidebarMenu.jsx"
import { Menu, X, Home, FileText, Tag, User, Settings, Search } from "lucide-react";

const BlogHeader = ({ title = "My Blog" }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [cat, setCat] = useState([])
	const [activeSection, setActiveSection] = useState("home");
	const [open, setOpen] = useState(false);
	const { user, accessToken, loading } = useSelector(state => state.auth);

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
  }

  return (
    <header className="fixed top-0 left-0 w-full z-40">
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Left: blob toggle + title */}
            <LeftBlob blobButtonVariants={blobButtonVariants} sidebarVariants={sidebarVariants} 
              backdropVariants={backdropVariants} open={open} setOpen={setOpen} />

            {/* Right: search and profile */}
            <div className="flex items-center gap-3">
              <SearchBar />

              <UserAccount user={user} handleLogout={handleLogout} accessToken={accessToken} navigate={navigate} />
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

              {/*action buttons*/}
              <div className="mt-8 border-t border-white/6 pt-6 text-sm text-white/70">
                <div className="mb-2">Theme</div>
                <div className="flex items-center gap-2">
                  {user ? <button onClick={handleLogout} className="px-3 py-1 rounded bg-white/6">Logout</button> : <Link to="/auth/login"><button className="px-3 py-1 rounded bg-white/6">Login</button></Link>}
                  <Link to="/blogs/username/dashboard">
                    {user && <button className="px-3 py-1 rounded bg-white/6">Dashboard</button>}
                  </Link>
                </div>
              </div>

              <SidebarMenu setOpen={setOpen} categories={categories} />

              <div className="mt-6">
                <h3 className="text-xs text-white/60 uppercase mb-3">Recently viewed</h3>
                <ul className="flex flex-col gap-2">
                  <li className="px-3 py-2 bg-white/2 rounded-lg">How to ship faster with CI/CD</li>
                  <li className="px-3 py-2 bg-white/2 rounded-lg">Redis caching patterns</li>
                </ul>
              </div>
              {/*footer*/}
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