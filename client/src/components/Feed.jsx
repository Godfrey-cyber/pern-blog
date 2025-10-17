import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { fetchBlogs } from "../services/blogService.js"
import { formatDate } from "../utilities/utiles.js"
import { fetchBlogs } from "../redux/blogThunk.js"
import TimeAgo from "react-timeago";
import { useDispatch, useSelector } from "react-redux"

const Feed = () => {
	// const [blogs, setBlogs] = useState([]);
	const { blogs, loading, error } = useSelector(state => state.blog);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
	    const controller = new AbortController();
	    dispatch(fetchBlogs())
	    return () => controller.abort();
	  }, []);
	if (loading) return <p>Loading blogs...</p>;
	return (
		<>
			{blogs?.slice(1, 6).map(({id, slug, createdAt, title, description, image, category}) => (
				<Link to={`/blog/${slug}/${id}`} key={id || slug} className="feed">
					<div className="grid grid-cols-12 gap-4 rounded-md">
						<img src={image} alt="" className="col-span-6 h-64 object-fit" />
						<div className="col-span-6 flex flex-col space-y-4">
							<span className="flex items-center flex-row space-x-3">
								<p className="text-sm font-semibold text-amber-500">{category?.title}</p>
								<p className="front-time text-xs">
									<TimeAgo date={createdAt} />
								</p>
							</span>
							<span className="flex flex-col space-y-3">
								<p className="text-2xl font-bold text-black">{title}</p>
								<p className="text-sm font-normal text-black">{description}</p>
							</span>
						</div>
					</div>
				</Link>
			))}
		</>
	)
}

export default Feed