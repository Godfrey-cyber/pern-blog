import React from 'react'

const CommentSkeleton = () => (
  <div className="animate-pulse flex flex-col space-y-4 w-full lg:w-4/5 my-4 px-5 md:px-10 lg:px-20">
    {Array(3).fill().map((_, i) => (
      <div key={i} className="flex flex-row space-x-3 my-4 w-full skeleton">
        <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-amber-300 blur-sm"></div>
        <div className="flex flex-col space-y-2 w-full">
          <div className="h-3 w-24 bg-gray-200 rounded blur-sm"></div>
          <div className="h-2 w-32 bg-gray-200 rounded blur-sm"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded blur-sm"></div>
          <div className="flex flex-row space-x-3 mt-2">
            <div className="h-3 w-12 bg-gray-200 rounded blur-sm"></div>
            <div className="h-3 w-12 bg-gray-200 rounded blur-sm"></div>
            <div className="h-3 w-12 bg-gray-200 rounded blur-sm"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);


export default CommentSkeleton