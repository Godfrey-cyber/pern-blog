import React, { useEffect, useState } from 'react';
// packages
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
// files
import { axiosInstance } from '../utilities/utiles.js';
import LoadingBlog from "../components/LoadingBlog.jsx"
import BlogHeader from "../components/BlogHeader.jsx"
import FrontPage from "../components/FrontPage.jsx"
import Feed from "../components/Feed.jsx"
import Footer from "../components/Footer.jsx"
import { fetchBlogs } from "../redux/blogThunk.js"
import { useDispatch, useSelector } from "react-redux"

const LandingPage = () => {
	const [isModalOpen2, setIsModalOpen2] = useState(false);
	const { blogs, isFetching, error } = useSelector(state => state.blog);

	if (isFetching) return <p>Loading blog...</p>;
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