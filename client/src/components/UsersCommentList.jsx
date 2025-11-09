import React from 'react'
import TimeAgo from "react-timeago";
import { ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
// import CommentSkeleton from "../skeletons/CommentSkeleton.jsx"
import CommentSkeleton from "./skeletons/CommentSkeleton.jsx"

const UsersCommentList = ({ blog, isLoading, isError }) => {
	return (
		<div className="flex flex-col space-y-4 w-full lg:w-4/5 my-4 px-5 md:px-10 lg:px-20">
			{!blog?.comments?.length ? (
			    <CommentSkeleton />
			) : (
			blog?.comments?.map(comment => (
				<div key={comment.id} className="flex flex-row space-x-3 my-4 w-full">
					<div className="">
						<span className="col-span-1 flex flex-col items-center justify-center w-10 h-10 rounded-full bg-gray-200 border-2 border-amber-500 text-sm font-semibold text-gray-400">{comment?.author?.username.split(" ").length === 2 ? comment?.author?.username?.split(" ")[0].charAt(0) : comment?.author?.username?.charAt(0)}{comment?.author?.username.split(" ").length === 2 ? comment?.author?.username?.split(" ")[1].charAt(0) : ""}
						</span>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="text-amber-700 font-semibold text-xs ">By {comment?.author?.username}</p>
						<TimeAgo className="text-gray-500 text-xs font-normal" date={comment?.createdAt} />
						<div className="flex flex-col space-y-3">
							<span className="flex flex-col w-full">
								<p className="text-black font-normal text-sm my-1">{comment?.content}</p>
							</span>
							<div className="flex flex-row space-x-4 items-center my-1">
								<span className="flex flex-row items-center space-x-1.5 md:space-x-3 text-gray-600 text-sx">
									<ThumbsUp className="cursor-pointer h-4 w-4" />
									<p className="text-xs font-normal">1</p>
								</span>
								<span className="flex flex-row items-center space-x-1.5 md:space-x-3 text-gray-600 text-sx">
									<ThumbsDown className="cursor-pointer h-4 w-4" />
									<p className="text-xs font-normal">0</p>
								</span>
								<span className="flex flex-row items-center space-x-1.5 md:space-x-3 text-gray-600 text-sx">
									<Share2 className="cursor-pointer h-4 w-4" />
									<p className="text-xs font-normal">0</p>
								</span>
							</div>
						</div>
					</div>
				</div>
			))
  		)}
		</div>
	)
}

export default UsersCommentList