import React from 'react'
import TimeAgo from "react-timeago";
import { AiOutlineLike, AiTwotoneDislike } from "react-icons/ai";
import { FaRegShareSquare } from "react-icons/fa";

const UsersCommentList = ({ blog }) => {
	return (
		<div className="flex flex-col space-y-4 w-full lg:w-4/5 my-4 px-5 md:px-10 lg:px-20">
			{blog?.comments?.map(comment => (
				<div key={comment.id} className="flex flex-col space-y-3 w-full">
					<div className="flex flex-row space-x-3 my-4">
						<span className="flex flex-col items-center justify-center w-10 h-10 rounded-full bg-gray-200 border-2 border-amber-500 text-lg font-semibold text-gray-400">{comment?.author?.username?.split(" ")[0].charAt(0) || comment?.author?.username?.charAt(0)}</span>
						<span className="flex flex-col space-y-1">
							<p className="text-amber-700 font-semibold text-xs ">By {comment?.author?.username}</p>
							<TimeAgo className="text-gray-500 text-xs font-normal" date={comment?.createdAt} />
						</span>
					</div>
					<div className="flex flex-col space-y-3">
						<p className="text-black font-normal text-sm my-1">{comment?.content}</p>
						<div className="flex flex-row space-x-4 items-center my-1">
							<span className="flex flex-row items-center space-x-1.5 md:space-x-3 text-gray-600 text-sx">
								<AiOutlineLike className="cursor-pointer h-4 w-4" />
								<p className="text-xs font-normal">1</p>
							</span>
							<span className="flex flex-row items-center space-x-1.5 md:space-x-3 text-gray-600 text-sx">
								<AiOutlineLike className="cursor-pointer h-4 w-4" />
								<p className="text-xs font-normal">0</p>
							</span>
							<span className="flex flex-row items-center space-x-1.5 md:space-x-3 text-gray-600 text-sx">
								<FaRegShareSquare className="cursor-pointer h-4 w-4" />
								<p className="text-xs font-normal">0</p>
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default UsersCommentList