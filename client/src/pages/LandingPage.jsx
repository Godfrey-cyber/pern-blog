import React, { useEffect, useState } from 'react';
// packages
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
// files
import { axiosInstance } from '../utilities/utiles.js';
import LoadingBlog from "../components/LoadingBlog.jsx"
import BlogHeader from "../components/BlogHeader.jsx"
import { fetchBlogs } from "../services/blogService.js"

const LandingPage = () => {
	const [isModalOpen2, setIsModalOpen2] = useState(false);
	const { blogs, loading, error } = useSelector(state => state.blog);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
	    // const controller = new AbortController();
	    dispatch(fetchBlogs())
	    // return () => controller.abort();
	  }, [dispatch]);
	if (loading) return <p>Loading blog...</p>;
	return (
		<div className="flex flex-col w-full h-screen w-full">
			<BlogHeader setIsModalOpen2={setIsModalOpen2}/>
			<FrontPage />
			<Feed />
			<Footer />
		</div>
	)
}

export default LandingPage
// http://localhost:5500/